<script lang="ts">
	let modal: HTMLDialogElement;

	export let onClose: () => void;
	export let isOpen: boolean;

	let close = () => {};

	$: if (modal) {
		close = () => {
			modal.classList.add('close');
			setTimeout(() => {
				modal.classList.remove('close');
				onClose();
				modal.close();
			}, 90);
		};

		document.addEventListener('keydown', (ev) => {
			if (ev.key === 'Escape') {
				close();
			}
		});
		modal.addEventListener('click', (e) => {
			const dims = modal.getBoundingClientRect();
			const clickedOutside =
				e.clientX < dims.left ||
				e.clientX > dims.right ||
				e.clientY < dims.top ||
				e.clientY > dims.bottom;

			if (clickedOutside) {
				close();
			}
		});

		if (isOpen && !modal.open) {
			modal.showModal();
		} else if (!isOpen) {
			close();
		}
	}
</script>

<dialog bind:this={modal}>
	<!-- using 'close' class here because the global style isn't working -->
	<div class="close relative">
		<div class="flex flex-row w-full justify-end sticky top-0 right-2 overflow-scroll py-2 pr-2">
			<button class="close-card-x flex justify-center items-center bg-black" on:click={close}>
				<span class="leading-4">✕</span>
			</button>
		</div>
		<div class="px-2 pb-2">
			<slot />
		</div>
	</div>
</dialog>

<style global>
	.close-card-x {
		border-radius: 4px;
		width: 20px;
		height: 20px;
		@apply text-yellow-300 border border-yellow-700 outline-none;
	}

	dialog {
		background-color: #060016;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='326' height='271.7' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.05'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");

		position: absolute;
		top: 0;
		left: 0;
		border-radius: 10px;
		@apply p-0 border border-slate-800;
	}

	dialog > div > div {
		/* background-color: #000000;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0.9' stop-color='%23640062' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23640062' stop-opacity='0.2'/%3E%3C/radialGradient%3E%3ClinearGradient id='c' x1='1' y1='0' x2='0' y2='0' gradientTransform='rotate(0,0.5,0.5)'%3E%3Cstop offset='0' stop-color='%23000000'/%3E%3Cstop offset='.5' stop-color='%23000000'/%3E%3Cstop offset='1' stop-color='%23000000'/%3E%3C/linearGradient%3E%3Cg id='b' fill='url(%23a)' %3E%3Ccircle cx='1560' cy='1560' r='2500'/%3E%3Ccircle cx='1520' cy='1520' r='2450'/%3E%3Ccircle cx='1480' cy='1480' r='2400'/%3E%3Ccircle cx='1440' cy='1440' r='2350'/%3E%3Ccircle cx='1400' cy='1400' r='2300'/%3E%3Ccircle cx='1360' cy='1360' r='2250'/%3E%3Ccircle cx='1320' cy='1320' r='2200'/%3E%3Ccircle cx='1280' cy='1280' r='2150'/%3E%3Ccircle cx='1240' cy='1240' r='2100'/%3E%3Ccircle cx='1200' cy='1200' r='2050'/%3E%3Ccircle cx='1160' cy='1160' r='2000'/%3E%3Ccircle cx='1120' cy='1120' r='1950'/%3E%3Ccircle cx='1080' cy='1080' r='1900'/%3E%3Ccircle cx='1040' cy='1040' r='1850'/%3E%3Ccircle cx='1000' cy='1000' r='1800'/%3E%3Ccircle cx='960' cy='960' r='1750'/%3E%3Ccircle cx='920' cy='920' r='1700'/%3E%3Ccircle cx='880' cy='880' r='1650'/%3E%3Ccircle cx='840' cy='840' r='1600'/%3E%3Ccircle cx='800' cy='800' r='1550'/%3E%3Ccircle cx='760' cy='760' r='1500'/%3E%3Ccircle cx='720' cy='720' r='1450'/%3E%3Ccircle cx='680' cy='680' r='1400'/%3E%3Ccircle cx='640' cy='640' r='1350'/%3E%3Ccircle cx='600' cy='600' r='1300'/%3E%3Ccircle cx='560' cy='560' r='1250'/%3E%3Ccircle cx='520' cy='520' r='1200'/%3E%3Ccircle cx='480' cy='480' r='1150'/%3E%3Ccircle cx='440' cy='440' r='1100'/%3E%3Ccircle cx='400' cy='400' r='1050'/%3E%3Ccircle cx='360' cy='360' r='1000'/%3E%3Ccircle cx='320' cy='320' r='950'/%3E%3Ccircle cx='280' cy='280' r='900'/%3E%3Ccircle cx='240' cy='240' r='850'/%3E%3Ccircle cx='200' cy='200' r='800'/%3E%3Ccircle cx='160' cy='160' r='750'/%3E%3Ccircle cx='120' cy='120' r='700'/%3E%3Ccircle cx='80' cy='80' r='650'/%3E%3Ccircle cx='40' cy='40' r='600'/%3E%3Ccircle cx='0' cy='0' r='550'/%3E%3C/g%3E%3C/defs%3E%3Crect fill='url(%23c)' width='2000' height='1500'/%3E%3Cg %3E%3Cuse href='%23b' x='-500' y='-1000' /%3E%3Cuse href='%23b' x='-2500' y='-1000' transform='scale(-1 1)'/%3E%3C/g%3E%3C/svg%3E");
		background-attachment: fixed;
		background-size: cover; */
	}

	dialog[open]:not(.close) {
		animation: myFadeIn 0.2s ease normal;
		animation-iteration-count: 1;
	}
	@keyframes myFadeIn {
		from {
			opacity: 0;
			top: 100%;
		}
		to {
			opacity: 1;
			top: 0px;
		}
	}
	.close {
		animation: fadeOut 0.1s ease normal;
	}
	@keyframes fadeOut {
		from {
			top: 0;
		}
		to {
			top: 100%;
			opacity: 0;
		}
	}
	dialog::backdrop {
		background-color: hsla(0, 0%, 0%, 0.7);
	}
</style>
