<script lang="ts">
	import Icon from '@iconify/svelte';
	import { writable } from 'svelte/store';

	type Players = 'Emme' | 'Ralf' | 'Nemesis';
	const originalPlayers: Players[] = ['Emme', 'Emme', 'Ralf', 'Ralf', 'Xaxos', 'Xaxos'];
	const colors = {
		['Emme']: 'lime',
		['Ralf']: 'red',
		['Nemesis']: 'black',
		['Assault']: 'purple'
	};

	function randomPlayers() {
		let a = originalPlayers.slice(0);
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const players = writable(randomPlayers());
	const turn = writable(0);

	let player: Players = 'Emme';
	let index = 0;
	$: {
		index = $turn % 6;
		if (index === 0) {
			$players = randomPlayers();
		}
		player = $players[index];
	}

	const grimholdHealth = writable(30);
	const bossHealth = writable(70);
</script>

<div class="flex flex-col landscape:flex-row main bg py-10" style="flex: 1 1 auto">
	<div class="h-[30vh]">
		<button on:click={() => ($turn += 1)} class="w-full h-full flex flex-col items-center p-3">
			<div class="flex flex-row gap-5 p-3 rounded-full bg-opacity-30 bg-white items-center">
				{#each $players as p, i (i)}
					{#if i > index}
						<!-- future -->
						<Icon icon="ri:circle-line" style="font-size:large" color="gray" />
					{:else if i == index}
						<!-- present -->
						<Icon icon="carbon:circle-filled" style="font-size:2em" color={colors[p]} />
					{:else}
						<!-- past -->
						<Icon icon="carbon:circle-solid" style="font-size:large" color={colors[p]} />
					{/if}
				{/each}
			</div>
			{#key $turn}
				<div class="h-[70%] flex items-center show relative">
					<span class="text-[5em]">{player}</span>
				</div>
			{/key}
		</button>
	</div>
	<div class="h-[30vh]">
		<div class="flex flex-row gap-2 p-2 h-full justify-center py-10">
			<button
				on:click={() => $grimholdHealth--}
				class="h-full w-[20%] border border-white border-opacity-30 rounded-lg">{'<'}</button
			>
			<button class="h-full w-[60%] flex flex-col justify-center items-center">
				<div class="text-[6em] font-extrabold">{$grimholdHealth}</div>
				<div class="text-3xl">Grimhold</div>
			</button>
			<button
				on:click={() => $grimholdHealth++}
				class="h-full w-[20%] border border-white border-opacity-30 rounded-lg">{'>'}</button
			>
		</div>
	</div>
	<div class="h-[30vh]">
		<div class="flex flex-row gap-2 p-2 h-full justify-center py-10">
			<button
				on:click={() => $bossHealth--}
				class="h-full w-[20%] border border-white rounded-lg border-opacity-30">{'<'}</button
			>
			<button class="h-full w-[60%] flex flex-col justify-center items-center">
				<div class="text-[6em] font-extrabold">{$bossHealth}</div>
				<div class="text-3xl">Boss</div>
			</button>
			<button
				on:click={() => $bossHealth++}
				class="h-full w-[20%] border border-white rounded-lg border-opacity-30">{'>'}</button
			>
		</div>
	</div>
</div>

<style>
	* {
		@apply text-white;
	}
	.bg {
		background-color: #41281b;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a'%3E%3Cstop offset='0' stop-color='%23000' stop-opacity='.4'/%3E%3Cstop offset='1' stop-color='%23000' stop-opacity='0'/%3E%3C/radialGradient%3E%3Cg id='b'%3E%3Crect fill='url(%23a)' fill-opacity='.9' x='-1000' y='750' width='4000' height='100'/%3E%3Crect fill-opacity='.9' x='-1000' y='-700' width='4000' height='1500'/%3E%3C/g%3E%3Cg id='c'%3E%3Cg transform='rotate(10 0 0)' style='transform-origin:center'%3E%3Cuse href='%23b' style='transform-origin:center'/%3E%3C/g%3E%3Cg transform='rotate(-10 0 0)' style='transform-origin:center'%3E%3Cuse href='%23b' transform='' style='transform-origin:center'/%3E%3C/g%3E%3C/g%3E%3C/defs%3E%3Crect fill='%2341281B' width='100%25' height='100%25'/%3E%3Cg transform='' style='transform-origin:center'%3E%3Cg transform='' style='transform-origin:center'%3E%3Cuse fill='%2344371f' href='%23c' y='0'/%3E%3Cuse fill='%2341472b' href='%23c' y='-200'/%3E%3Cuse fill='%233b563f' href='%23c' y='-400'/%3E%3Cuse fill='%2333645a' href='%23c' y='-600'/%3E%3Cuse fill='%23347077' href='%23c' y='-800'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover;
	}

	.show {
		animation: opacity-kf 500ms ease-in;
	}

	@keyframes opacity-kf {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
