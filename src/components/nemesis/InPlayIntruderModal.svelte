<script lang="ts">
	import Modal from '$components/modal.svelte';
	import gameState, { type GameState, type IntruderToken } from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';
	import Token from './Token.svelte';

	let note: string | undefined;
	let damage: number;
	let opened = false;

	$: onClose = () => {
		if (!$gameState.clickedInPlayID) return; // removing this creates infinite renders
		$gameState = mechanics.setNote($gameState, $gameState.clickedInPlayID, note);
		note = '';
		$gameState = mechanics.setDamage($gameState, $gameState.clickedInPlayID as string, damage);
		damage = 0;
		$gameState = mechanics.unclickInPlayIntruder($gameState);
		opened = false;
	};

	let selectedIntruder: GameState['inPlay'][number];

	$: if (!!$gameState.clickedInPlayID) {
		selectedIntruder = $gameState.inPlay.find(
			(i) => i.id === $gameState.clickedInPlayID
		) as IntruderToken;
		if (!opened) {
			({ note, damage } = selectedIntruder);
		}
		opened = true;
	}

	const setDamageIntruder = (dmg: 1 | -1) => {
		damage += dmg;
	};

	const kill = (id: string) => {
		$gameState = mechanics.kill($gameState, $gameState.clickedInPlayID as string);
	};

	const returnToBag = (id: string) => {
		$gameState = mechanics.returnToBag($gameState, $gameState.clickedInPlayID as string);
	};
</script>

<Modal isOpen={!!$gameState.clickedInPlayID} {onClose}>
	{#if selectedIntruder}
		<div class="flex flex-col gap-8 landscape:gap-2 px-3 content-center">
			<div class="flex flex-row gap-5">
				<div class="landscape:hidden">
					<Token intruder={selectedIntruder} size="lg" color="red" />
				</div>
				<div class="portrait:hidden">
					<Token intruder={selectedIntruder} size="sm" color="red" />
				</div>
				<div class="flex flex-col justify-around">
					<div>
						<div class="text-center">Damage</div>
						<div class="flex flex-row gap-2">
							<button class="calcButton radius" on:click={() => setDamageIntruder(-1)}>-</button>
							<div>{damage}</div>
							<button class="calcButton radius" on:click={() => setDamageIntruder(1)}>+</button>
						</div>
					</div>
				</div>
			</div>
			<div class="flex flex-col justify-end gap-3 text-sm">
				<input
					placeholder="note"
					maxlength="120"
					class="py-1 px-2 bg-slate-700"
					bind:value={note}
				/>
				<button
					class="py-1 px-2 border border-yellow-700 bg-red-950 radius"
					on:click={() => kill(selectedIntruder.id)}>Kill</button
				>
				<button
					class="py-1 px-2 border border-yellow-700 bg-slate-900 radius"
					on:click={() => returnToBag(selectedIntruder.id)}>Return to bag</button
				>
			</div>
		</div>
	{/if}
</Modal>

<style>
	* {
		@apply text-yellow-400;
	}
	.radius {
		border-radius: 5px;
	}
	.calcButton {
		@apply bg-red-800 px-2 w-[20pt] leading-[20pt];
	}
</style>
