<script lang="ts">
	import type { IntruderToken } from '$gameplay/nemesis/GameState';

	export let size: 'sm' | 'md' | 'lg';
	export let color: 'yellow' | 'red' | 'blue';
	export let intruder: IntruderToken;
	export let classes: string = '';
</script>

<img
	src={intruder.src}
	alt={intruder.name}
	class={`w-min token ${size} ${color} ${classes}`}
	style={`transform: rotate(${intruder.rotation}deg);`}
/>

<style>
	.token {
		border-radius: 100%;
		@apply aspect-square;
	}
	.token.sm {
		box-shadow: 0px 0px 10px;
		@apply max-h-20 shadow-[0_0_20px_0px_rgba(0,0,0,1)];
	}

	.token.md {
		box-shadow: 0px 0px 10px;
		@apply max-h-28 shadow-[0_0_20px_0px_rgba(0,0,0,1)];
	}

	.token.lg {
		box-shadow: 0px 0px 30px;
		@apply max-h-32 shadow-[0_0_30px_0px_rgba(0,0,0,1)];
	}

	.token.red {
		@apply shadow-red-500;
	}

	.token.yellow {
		@apply shadow-yellow-500;
	}

	.token.blue {
		@apply shadow-blue-400;
	}
</style>
