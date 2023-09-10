<script lang="ts">
	import { enhance } from '$app/forms';
	const login = () => {
		return async () => {};
	};
</script>

<div class="flex flex-col max-w-[100px] gap-3">
	<form method="POST" use:enhance={login}>
		<input type="text" id="username" name="username" hidden value="bbb@bbb.com" />
		<input type="text" id="password" name="password" hidden value="bbbbbb" />
		<button type="submit">Sign In</button>
	</form>

	<button
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

<style>
	button {
		@apply border border-black rounded-lg p-3 w-full;
	}
</style>
