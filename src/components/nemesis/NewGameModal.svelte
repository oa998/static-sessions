<script lang="ts">
	import Modal from '$components/modal.svelte';
	import gameState, { type GameState } from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';

	let players: GameState['players'] = 4;

	$: onClose = () => {
		if (!$gameState.startNewGame) return; // removing this creates infinite renders
		$gameState = mechanics.toggleNewGamePrompt($gameState);
	};

	$: newGame = () => {
		$gameState = mechanics.newGame(players);
	};

	const setValue = (v: GameState['players']) => {
		players = v;
		[...document.querySelectorAll('.player')].forEach((b) => b.classList.remove('active'));
		document.getElementById(`b${v}`)?.classList.add('active');
	};
</script>

<Modal isOpen={!!$gameState.startNewGame} {onClose}>
	<div class="w-full text-center pb-2">Number of players:</div>
	<div class="flex flex-col landscape:flex-row justify-center items-center gap-2 w-[70vw]">
		<button id="b1" class="player" on:click={() => setValue(1)}>1</button>
		<button id="b2" class="player" on:click={() => setValue(2)}>2</button>
		<button id="b3" class="player" on:click={() => setValue(3)}>3</button>
		<button id="b4" class="player active" on:click={() => setValue(4)}>4</button>
		<button id="b5" class="player" on:click={() => setValue(5)}>5</button>
	</div>
	<button class="submit mt-4 mb-2" on:click={newGame}>Submit</button>
</Modal>

<style>
	* {
		@apply text-yellow-400;
	}

	button {
		border-radius: 5px;
		@apply w-full py-2;
	}
	button.player {
		@apply border border-blue-800;
	}

	button.player.active {
		@apply bg-slate-400 font-extrabold text-black text-2xl;
	}

	button.submit {
		@apply border border-yellow-700 bg-slate-900 text-yellow-400 font-bold py-4;
	}
</style>
