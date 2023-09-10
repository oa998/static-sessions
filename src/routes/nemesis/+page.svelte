<script lang="ts">
	import Mobile from '$components/mobile.svelte';
	import InPlayIntruderModal from '$components/nemesis/InPlayIntruderModal.svelte';
	import InPlayToken from '$components/nemesis/InPlayToken.svelte';
	import LogsModal from '$components/nemesis/LogsModal.svelte';
	import SurpriseAttackPenant from '$components/nemesis/SurpriseAttackPenant.svelte';
	import Token from '$components/nemesis/Token.svelte';
	import gameState, {
		DevelopmentRules,
		EncounterMessages,
		type IntruderToken
	} from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';
	import Icon from '@iconify/svelte';
	import NewGameModal from './../../components/nemesis/NewGameModal.svelte';

	/*
		New game
		- choose how many players

		Develop the bag

		Encounter
	
	*/

	const develop = () => ($gameState = mechanics.develop($gameState));

	const developDone = () => ($gameState = mechanics.developEnd($gameState));

	const encounter = () => ($gameState = mechanics.encounter($gameState));

	const encounterDone = () => ($gameState = mechanics.encounterDone($gameState));

	const resetGame = () => ($gameState = mechanics.toggleNewGamePrompt($gameState));

	const toggleLogs = () => ($gameState = mechanics.toggleLogs($gameState));

	const showClickedIntruder = (e: CustomEvent<IntruderToken>) =>
		($gameState = mechanics.clickInPlayIntruder($gameState, e.detail.id));

	// $: console.log(`\n.......\n` + $gameState.log.map((x) => '- ' + x).join('\n'));
	// $: console.log($gameState);
	// const getit =
</script>

<Mobile>
	<div slot="image" class="relative">
		<button class="absolute top-1 left-1 p-1 flex flex-col items-center" on:click={resetGame}>
			<Icon icon="ri:refresh-line" style="font-size:large" color="white" />
			<span class="text-xs text-white">New</span>
		</button>
		<button class="absolute top-1 right-1 p-1 flex flex-col items-center" on:click={toggleLogs}>
			<Icon icon="octicon:log-24" style="font-size:large" color="white" />
			<span class="text-xs text-white">Logs</span>
		</button>
		<img src="nemesis2.webp" alt="nemesis" class="w-full h-auto landscape:max-w-xs" />
	</div>

	<div slot="left-side-panel">
		<div class="flex flex-col gap-2 items-stretch p-2">
			<div class="text-blue-400 text-center">{`Tokens in bag: ${$gameState.inBag.length}`}</div>
			<button
				class="text-white border border-yellow-700 bg-slate-900 p-3 disabled:border-gray-800 disabled:bg-gray-950 disabled:text-gray-800"
				style="border-radius: 10pt;"
				disabled={$gameState.developing.length > 0 ||
					$gameState.inBag.length === 0 ||
					$gameState.encounter.length > 0}
				on:click={develop}>Develop</button
			>

			<button
				class="text-white border border-yellow-700 bg-red-950 p-3 disabled:border-gray-800 disabled:bg-gray-950 disabled:text-gray-800"
				style="border-radius: 10pt;"
				disabled={$gameState.encounter.length > 0 || $gameState.inBag.length === 0}
				on:click={encounter}>Encounter</button
			>
		</div>
	</div>

	<div slot="right-side-panel" class="flex flex-col text-yellow-300 p-3 h-full justify-between">
		<div class="flex flex-row portrait:flex-col justify-around items-center gap-1">
			<!-- Development card -->
			{#if $gameState.developing.length > 0}
				<div class="card develop landscape:h-full">
					<button class="close-card-x flex justify-center items-center" on:click={developDone}
						><span class="leading-4">✕</span>
					</button>
					<div class={`${$gameState.encounter.length > 0 ? 'hidden' : 'portrait:hidden'}`}>
						<Token intruder={$gameState.developing[0]} size="lg" color="yellow" />
					</div>
					<div class={`${$gameState.encounter.length > 0 ? '' : 'landscape:hidden'}`}>
						<Token intruder={$gameState.developing[0]} size="sm" color="yellow" />
					</div>

					<div class="italic text-xs text-center px-2">
						{DevelopmentRules[$gameState.developing[0].name].message}
					</div>
				</div>
			{/if}

			<!-- Encounter card -->
			{#if $gameState.encounter.length > 0}
				<div class="card encounter landscape:h-full">
					<button class="close-card-x flex justify-center items-center" on:click={encounterDone}
						><span class="leading-4">✕</span>
					</button>
					<div class="w-max relative">
						<Token intruder={$gameState.encounter[0]} size="sm" color="red" />
						<div class="absolute right-0 bottom-0">
							<SurpriseAttackPenant threat={$gameState.encounter[0].threat} />
						</div>
					</div>
					{#if EncounterMessages[$gameState.encounter[0].name]}
						<div class="italic text-xs text-center px-2">
							{EncounterMessages[$gameState.encounter[0].name].message}
						</div>
					{/if}
				</div>
			{/if}
		</div>
		<div
			class="flex flex-row min-h-[6rem] max-h-2 p-3 gap-3 overflow-y-hidden overflow-x-scroll mb-6"
		>
			{#each $gameState.inPlay as intruder (intruder.id)}
				<InPlayToken {intruder} on:intruderClicked={showClickedIntruder} />
			{/each}
		</div>
	</div>
</Mobile>

<InPlayIntruderModal />
<LogsModal />
<NewGameModal />

<style>
	.card {
		border-radius: 10px;
		@apply border border-yellow-700 p-4 relative flex flex-col items-center gap-2 w-full justify-center;
	}

	.card.develop {
		flex: 3;
	}

	.card.encounter {
		flex: 1;
	}

	@media (orientation: landscape) {
		.card.encounter {
			width: max-content;
		}
	}

	@media (orientation: portrait) {
		.card.encounter {
			width: 100%;
		}
	}

	.card > .close-card-x {
		border-radius: 4px;
		width: 20px;
		height: 20px;
		@apply absolute top-2 right-2 text-yellow-300 border border-yellow-700 outline-none text-sm;
	}

	button {
		-webkit-tap-highlight-color: transparent;
	}
</style>
