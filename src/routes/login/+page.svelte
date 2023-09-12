<script lang="ts">
	import { enhance } from '$app/forms';
	const login = () => {
		return async () => {};
	};
</script>

<div class="flex flex-col max-w-[100px] gap-3">
	<!-- <form
		method="POST"
		action="https://anything-storage-glovbogi2a-uc.a.run.app/auth/login"
		use:enhance={login}
	> -->
	<input type="text" id="email" name="email" hidden value="bbb@bbb.com" />
	<input type="text" id="password" name="password" hidden value="bbbbbb" />
	<!-- <button type="submit">Sign In asg</button> -->
	<button
		on:click={() => {
			fetch('https://anything-storage-glovbogi2a-uc.a.run.app/auth/login', {
				method: 'POST',
				headers: {
					accept: 'application/json',
					['content-type']: 'application/json'
				},
				body: JSON.stringify({
					username: 'bbb@bbb.com',
					password: 'bbbbbb',
					loc: 'ui'
				}),
				credentials: 'include'
			});
		}}>Sign In asg</button
	>
	<!-- </form> -->

	<button
		on:click={() => {
			fetch('https://nginx-anything-storage-glovbogi2a-uc.a.run.app/auth/login', {
				method: 'POST',
				headers: {
					accept: 'application/json',
					['content-type']: 'application/json'
				},
				body: JSON.stringify({
					username: 'bbb@bbb.com',
					password: 'bbbbbb',
					loc: 'ui'
				}),
				credentials: 'include'
			});
		}}>Sign In nginx</button
	>

	<form
		method="POST"
		action="https://nginx-anything-storage-glovbogi2a-uc.a.run.app/auth/login"
		use:enhance={login}
	>
		<input type="text" id="email" name="email" hidden value="bbb@bbb.com" />
		<input type="text" id="password" name="password" hidden value="bbbbbb" />
		<button type="submit">form Sign In nginx</button>
	</form>

	<button
		on:click={() => {
			console.log('getit');
			fetch('https://anything-storage-glovbogi2a-uc.a.run.app/auth/login', {
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
