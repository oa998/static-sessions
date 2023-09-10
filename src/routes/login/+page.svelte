<button
	class="bg-red-400 w-full p-5"
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
	}}>LOG IN</button
>

<form method="POST" action="https://nginx-anything-storage-glovbogi2a-uc.a.run.app/auth/login">
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

<hr />
<!-- 
<div class="flex flex-col min-w-max gap-2 p-2 text-white">
	<button
		class="bg-red-400 w-full p-5"
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
		}}>LOG IN</button
	>
	<button
		class="w-full bg-blue-400 p-5"
		on:click={() => {
			console.log('getit');
			fetch('https://anything-storage-glovbogi2a-uc.a.run.app/app', {
				method: 'GET',
				credentials: 'include'
			})
				.then((r) => r.text().then(console.log))
				.catch((e) => console.log('errorrrrr', e))
				.then(() => console.log('called /'));
		}}>Get It</button
	>
</div> -->
