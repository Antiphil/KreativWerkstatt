<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/images/KreaWe.svg';
	import nav from '$lib/assets/images/navdecor.svg';
	import { currentUser } from '$lib/stores/user';
</script>

<div class="w-full fixed top-0 z-40">
	<div class="w-full pt-5 pb-0 bg-primary">
		<div class="container flex justify-between">
			<a href="/" class="w-16 block">
				<img src={logo} class="scale-[1.50] hover:scale-[1.65] transition-all" alt="" />
			</a>
			<div class=" flex justify-end">
				<div class="flex flex-col -mx-6 lg:flex-row lg:items-center mr-2 text-primary-foreground">
					<a href="/" class="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-primary-hover hover:text-white">Startseite</a>
					<a href="/gallery" class="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-primary-hover hover:text-white">Galerie</a>
					<!-- <a href="/about" class="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-primary-hover hover:text-white">Über uns</a> -->
					<a href="/contact" class="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-primary-hover hover:text-white">Kontakt</a>
					<!-- <a href="/auth/login" class="px-3 py-2 mx-3 mt-2  transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-primary-hover hover:text-white ">Login</a> -->
					{#if $currentUser}
						<a href="/admin" class="px-3 py-2 mx-3 mt-2 transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-primary-hover hover:text-white">Verwaltung</a>
					{/if}
				</div>

				<div class="flex items-center mt-4 lg:mt-0">
					{#if $currentUser}
						<button on:click={() => goto('/auth/logout')} type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
							<div class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
								<img src="http://127.0.0.1:8090/api/files/_pb_users_auth_/szl0bq19gl5yoxh/{$currentUser?.avatar}" class="object-cover w-full h-full" alt="avatar" />
							</div>
						</button>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<img src={nav} class="-mt-1 w-full" alt="" />
</div>
