import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const version = 33;

export type IntruderToken = {
	name: string;
	threat: number;
	damage: number;
	src: string;
	id: string;
	rotation: number;
};

export type GameState = {
	players: 1 | 2 | 3 | 4 | 5;
	clickedInPlayID?: string;
	inBag: IntruderToken[];
	inPlay: (IntruderToken & { note?: string })[];
	developing: IntruderToken[];
	encounter: IntruderToken[];
	remainingTokens: IntruderToken[];
	dead: IntruderToken[];
	log: string[];
	logsOpen: boolean;
	startNewGame: boolean;
	version: number;
};

export const Intruders = {
	QUEEN: 'QUEEN',
	BREEDER: 'BREEDER',
	ADULT: 'ADULT',
	CREEPER: 'CREEPER',
	LARVA: 'LARVA',
	BLANK: 'BLANK'
};

const images = {
	[Intruders.QUEEN]: 'QueenOfficial.webp',
	[Intruders.BREEDER]: 'BreederOfficial.webp',
	[Intruders.ADULT]: 'AdultOfficial.webp',
	[Intruders.CREEPER]: 'CreeperOfficial.webp',
	[Intruders.LARVA]: 'LarvaOfficial.webp',
	[Intruders.BLANK]: 'BlankOfficial.webp'
};

const totalTokens = {
	[Intruders.LARVA]: [
		{
			threat: 1,
			tokens: 8
		}
	],
	[Intruders.CREEPER]: [
		{
			threat: 1,
			tokens: 3
		}
	],
	[Intruders.ADULT]: [
		{
			threat: 2,
			tokens: 4
		},
		{
			threat: 3,
			tokens: 5
		},
		{
			threat: 4,
			tokens: 3
		}
	],
	[Intruders.BREEDER]: [
		{
			threat: 3,
			tokens: 1
		},
		{
			threat: 4,
			tokens: 1
		}
	],
	[Intruders.QUEEN]: [
		{
			threat: 4,
			tokens: 1
		}
	]
};

const totalCountPerIntruder = Object.entries(totalTokens).reduce((acc, [k, v]) => {
	for (const tt of v) {
		acc[k] = (acc[k] || 0) + tt.tokens;
	}
	return acc;
}, {} as { [key: string]: number });

function resetAllIntruders() {
	const ALL_INTRUDERS: IntruderToken[] = [];
	let key: keyof typeof Intruders;
	for (key in Intruders) {
		const name = Intruders[key];
		if (name === Intruders.BLANK) {
			ALL_INTRUDERS.push({
				name,
				threat: 0,
				damage: 0,
				src: images[name],
				id: `${name}_0`,
				rotation: 50
			});
			continue;
		}
		let x = 0;
		for (const j in totalTokens[name]) {
			if (+j === 0) x = 0; // reset the outermost counter for every new totken type
			const tt = totalTokens[name][j];
			for (let i = 0; i < tt.tokens; i++) {
				x++;
				ALL_INTRUDERS.push({
					name,
					threat: tt.threat,
					damage: 0,
					src: images[name],
					id: `${name}_${j}${i}`,
					rotation: x * (360 / totalCountPerIntruder[name])
				});
			}
		}
	}
	return ALL_INTRUDERS;
}

Array.prototype.popRandom = function () {
	if (this.length === 0) return null;
	const index = Math.floor(Math.random() * this.length);
	const element = this[index];
	this.splice(index, 1);
	return element;
};

export function putRandomIntruderIntoBag(state: GameState, name: string) {
	const options = state.remainingTokens.filter((i) => i.name === name);
	if (options.length > 0) {
		const o = options?.popRandom() as IntruderToken;
		const index = state.remainingTokens.findIndex((intruder) => intruder?.id === o.id);
		state.remainingTokens.splice(index, 1); // remove this one
		state.inBag.push(o);
	} else {
		console.log('no', name, 'remaining to be added to bag');
	}
	return state;
}

export const newGame = (players: GameState['players'] = 3) => {
	const allIntruders = resetAllIntruders();
	const startingCounts = {
		[Intruders.BLANK]: 1,
		[Intruders.LARVA]: 4,
		[Intruders.CREEPER]: 1,
		[Intruders.ADULT]: 3 + players,
		[Intruders.BREEDER]: 0,
		[Intruders.QUEEN]: 1
	};

	const newState: GameState = {
		players,
		inBag: [],
		inPlay: [],
		developing: [],
		encounter: [],
		remainingTokens: allIntruders,
		dead: [],
		log: [],
		logsOpen: false,
		startNewGame: true,
		version
	};

	for (const intruder of Object.keys(startingCounts)) {
		for (let i = 0; i < startingCounts[intruder]; i++) {
			putRandomIntruderIntoBag(newState, intruder);
		}
	}

	return newState;
};

const gameState = writable<GameState>();

if (browser && localStorage?.getItem('game')) {
	const previous = JSON.parse(localStorage.getItem('game') as string) as GameState;
	if (previous.version === version) {
		gameState.set(previous);
	} else {
		gameState.set(newGame(4));
	}
} else {
	gameState.set(newGame(2));
}

export default gameState;

type DevelopmentAction = (state: GameState) => GameState;
export const DevelopmentRules: { [key: string]: { message: string; action: DevelopmentAction } } = {
	[Intruders.BLANK]: {
		message: 'Add 1 Adult token to the Intruder bag. Return this token to the bag.',
		action: (state) => {
			const updated = putRandomIntruderIntoBag(state, Intruders.ADULT);
			const blank = updated.developing.pop() as IntruderToken; // should be the blank token
			updated.inBag.push(blank);
			return state;
		}
	},
	[Intruders.LARVA]: {
		message: 'Remove this token from the Intruder bag and add 1 Adult token to the Intruder bag.',
		action: (state) => {
			const updated = putRandomIntruderIntoBag(state, Intruders.ADULT);
			const larva = updated.developing.pop() as IntruderToken; // should be the larva token
			updated.remainingTokens.push(larva);
			return updated;
		}
	},
	[Intruders.CREEPER]: {
		message: 'Remove this token from the Intruder bag and add 1 Breeder token to the Intruder bag.',
		action: (state) => {
			const updated = putRandomIntruderIntoBag(state, Intruders.BREEDER);
			const creeper = updated.developing.pop() as IntruderToken; // should be the creeper token
			updated.remainingTokens.push(creeper);
			return updated;
		}
	},
	[Intruders.ADULT]: {
		message: `All players roll for Noise in order. If a player's Character is in Combat with an Intruder, this player does not perform a Noise roll. Return the Adult Intruder token to the Intruder bag.`,
		action: (state) => {
			const updated = state;
			const adult = updated.developing.pop() as IntruderToken; // should be the adult token
			updated.inBag.push(adult);
			return state;
		}
	},
	[Intruders.BREEDER]: {
		message: `All players roll for Noise in order. If a player's Character is in Combat with an Intruder, this player does not perform a Noise roll. Return the Breeder Intruder token to the Intruder bag.`,
		action: (state) => {
			const updated = state;
			const breeder = updated.developing.pop() as IntruderToken; // should be the breeder token
			updated.inBag.push(breeder);
			return updated;
		}
	},
	[Intruders.QUEEN]: {
		message: `Queen - If there are any Characters in the Nest Room, place the Queen miniature in that Room and resolve an Encounter. If there are no Characters in the Nest (or its location has not been discovered yet), add an additional Egg token on the Intruder board. Return the Queen Intruder token to the Intruder bag.`,
		action: (state) => {
			const updated = state;
			const queen = updated.developing.pop() as IntruderToken; // should be the queen token
			updated.inBag.push(queen);
			return updated;
		}
	}
};

export const EncounterMessages = {
	[Intruders.BLANK]: {
		message: 'Add 1 Adult token to the Intruder bag. Return this token to the bag.'
	}
};
