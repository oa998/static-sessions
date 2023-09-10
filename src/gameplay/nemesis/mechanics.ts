/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { browser } from '$app/environment';
import {
	DevelopmentRules,
	Intruders,
	newGame,
	putRandomIntruderIntoBag,
	type GameState,
	type IntruderToken
} from './GameState';

function storeLocal(key: string) {
	return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = function (this: any, gs: GameState, ...args: any[]) {
			const gsCopy = JSON.parse(JSON.stringify(gs));
			const result = originalMethod.apply(this, [gsCopy, ...args]);
			if (browser) localStorage.setItem(key, JSON.stringify(result));
			return result;
		};

		return descriptor;
	};
}

class Mechanics {
	@storeLocal('game')
	develop(gs: GameState) {
		if (gs.inBag.length === 0) return gs;
		if (gs.developing.length > 0) return gs;
		const intruder = gs.inBag.popRandom() as IntruderToken;
		gs.developing.push(intruder);
		return gs;
	}

	@storeLocal('game')
	developEnd(gs: GameState) {
		if (gs.developing.length === 0) return gs;
		const { message, action } = DevelopmentRules[gs.developing[0].name];
		this.captureLog(gs, `Development: Drew ${gs.developing[0].name}. ${message}`);
		return action(gs);
	}

	@storeLocal('game')
	encounter(gs: GameState) {
		if (gs.inBag.length === 0) return gs;
		// Should never be able to pop a null token here - should always have at least a blank token in bag
		const intruder = JSON.parse(JSON.stringify(gs.inBag.popRandom() as IntruderToken));
		gs.encounter = [intruder]; // Always save over encounter. Only one at a time.
		return gs;
	}

	@storeLocal('game')
	encounterDone(gs: GameState) {
		if (gs.encounter.length === 0) return gs;
		const lastEncounter = gs.encounter.pop() as IntruderToken;
		gs.encounter = [];
		// return the blank to the bag else put the Intruder into play
		if (lastEncounter.name === Intruders.BLANK) {
			gs.inBag.push(lastEncounter);
			putRandomIntruderIntoBag(gs, Intruders.ADULT);
			this.captureLog(gs, `Encounter: Drew a blank. ${Intruders.ADULT} added to bag.`);
		} else {
			gs.inPlay.push(lastEncounter);
			this.captureLog(
				gs,
				`Encounter: ${lastEncounter.name} put into play. Sneak attack value: ${lastEncounter.threat}.`
			);
		}
		return gs;
	}

	@storeLocal('game')
	kill(gs: GameState, tokenId: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		const intruder = gs.inPlay[index];
		gs.inPlay.splice(index, 1);
		gs.dead.push(intruder);
		this.captureLog(gs, `Killed ${intruder.name}.`);
		delete gs.clickedInPlayID;
		return gs;
	}

	@storeLocal('game')
	clickInPlayIntruder(gs: GameState, tokenId: string) {
		gs.clickedInPlayID = tokenId;
		return gs;
	}

	@storeLocal('game')
	unclickInPlayIntruder(gs: GameState) {
		gs.clickedInPlayID = undefined;
		return gs;
	}

	@storeLocal('game')
	setNote(gs: GameState, tokenId: string, note?: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		if (gs.inPlay[index].note === note) return gs; // do nothing if no change
		gs.inPlay[index].note = note;
		this.captureLog(gs, `Set note on ${gs.inPlay[index].name} to "${gs.inPlay[index].note}".`);
		return gs;
	}

	@storeLocal('game')
	setDamage(gs: GameState, tokenId: string, damage: number) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		const startDamage = gs.inPlay[index].damage;
		if (damage === startDamage) return gs; // do nothing if no change
		gs.inPlay[index].damage = damage;
		this.captureLog(
			gs,
			`Damage on ${gs.inPlay[index].name} changed from ${startDamage} to ${gs.inPlay[index].damage}.`
		);
		return gs;
	}

	@storeLocal('game')
	returnToBag(gs: GameState, tokenId: string) {
		if (gs.inPlay.length === 0) return gs;
		const index = gs.inPlay.findIndex((i) => i.id === tokenId);
		if (index < 0) return gs;
		const intruder = gs.inPlay[index];
		this.captureLog(gs, `Returned ${intruder.name} to bag.`);
		intruder.damage = 0;
		delete intruder.note;
		gs.inPlay.splice(index, 1);
		gs.inBag.push(intruder);
		delete gs.clickedInPlayID;
		return gs;
	}

	@storeLocal('game')
	toggleNewGamePrompt(gs: GameState) {
		gs.startNewGame = !gs.startNewGame;
		return gs;
	}

	@storeLocal('game')
	newGame(players: GameState['players']) {
		const gs = newGame(players);
		gs.startNewGame = false;
		this.captureLog(gs, `New game with ${players} players.`);
		return gs;
	}

	@storeLocal('game')
	toggleLogs(gs: GameState) {
		gs.logsOpen = !gs.logsOpen;
		return gs;
	}

	// not store local. Used in other mechanics methods
	captureLog(gs: GameState, message: string) {
		gs.log.push(message);
	}
}

export default new Mechanics();
