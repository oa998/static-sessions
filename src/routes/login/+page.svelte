<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	const login = () => {
		return async ({ result }: { result: ActionResult }) => {
			await applyAction(result);
		};
	};
</script>

<div class="flex flex-col max-w-sm">
	<form method="POST" use:enhance={login}>
		<input type="text" id="username" name="username" hidden value="bbb@bbb.com" />
		<input type="text" id="password" name="password" hidden value="bbbbbb" />
		<button type="submit">Sign In</button>
	</form>

	<button
		class="w-full bg-blue-400 p-5"
		on:click={() => {
			console.log('getit');
			fetch('https://nginx-anything-storage-glovbogi2a-uc.a.run.app/app', {
				method: 'GET',
				credentials: 'include'
			})
				.then((r) => r.text().then(console.log))
				.catch((e) => console.log('errorrrrr', e))
				.then(() => console.log('called /'));
		}}>Get It</button
	>
</div>
