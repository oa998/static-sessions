<script lang="ts">
	import Modal from '$components/modal.svelte';
	import gameState from '$gameplay/nemesis/GameState';
	import mechanics from '$gameplay/nemesis/mechanics';

	$: onClose = () => {
		if (!$gameState.logsOpen) return; // removing this creates infinite renders
		$gameState = mechanics.toggleLogs($gameState);
	};
</script>

<Modal isOpen={!!$gameState.logsOpen} {onClose}>
	{#if $gameState.logsOpen}
		<div class="flex flex-col gap-8 landscape:gap-4 min-w-[80vw] min-h-[10vh]">
			{#each $gameState.log as log}
				<div>{log}</div>
			{/each}
		</div>
	{/if}
</Modal>

<style>
	* {
		@apply text-yellow-400;
	}
</style>
