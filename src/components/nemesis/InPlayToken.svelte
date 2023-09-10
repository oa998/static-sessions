<script lang="ts">
	import type { IntruderToken } from '$gameplay/nemesis/GameState';
	import { createEventDispatcher } from 'svelte';
	import Token from './Token.svelte';

	export let intruder: IntruderToken;
	const dispatcher = createEventDispatcher();
</script>

<button
	on:click={() => dispatcher('intruderClicked', intruder)}
	class="relative flex flex-row aspect-square w-auto h-full outline-none"
>
	<Token {intruder} size="sm" color="red" />
	<div
		class="absolute circle bottom-0 right-0 bg-red-700 text-white h-full max-h-[20pt] w-full max-w-[20pt] text-center"
	>
		{intruder.damage}
	</div>
</button>

<style>
	button {
		-webkit-tap-highlight-color: transparent;
	}
	.circle {
		border-radius: 100%;
	}
	.token {
		border-radius: 100%;
	}
	.token.sm {
		@apply shadow-[0_0_20px_0px_rgba(0,0,0,1)] shadow-red-500;
	}
</style>
