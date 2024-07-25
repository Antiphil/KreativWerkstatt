<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/assets/images/KreaWe.svg';
	import nav from '$lib/assets/images/nav.svg';

	let currentUser = false;
	let currentavatar = 'http://127.0.0.1:8090/api/files/_pb_users_auth_/szl0bq19gl5yoxh/images_xl2nTuVYp6.png';
</script>

<div class="relative w-full h-24">
	<div class="absolute w-full h-full" style="background-image:url('{nav}')"></div>
	<nav class="absolute w-full">
		<div class="container mx-auto">
			<div class="flex flex-col md:flex-row md:justify-between md:items-center">
				<div class="flex items-center justify-between">
					<div class="flex items-center">
						<a href="/">
							<img class="w-auto h-10 sm:h-12" src={logo} alt="" />
						</a>
					</div>

					<!-- Mobile menu button -->
					<div class="flex lg:hidden">
						<button type="button" class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
							<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
							</svg>

							<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>
				</div>

				<!-- Mobile Menu open: "block", Menu closed: "hidden" -->
				<div class="absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
					<div class="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
						<a href="/gallery" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Galerie</a>
						<a href="/about" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Über Uns</a>
						<a href="/impressum" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Impressum</a>
						{#if !currentUser}
							<a href="/auth/login" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">login</a>
							<a href="/auth/logout" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">logout</a>
							<a href="/admin/upload" class="px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Admin</a>
						{/if}
						<!-- {#if currentUser}
					{/if} -->
					</div>

					<div class="flex items-center mt-4 lg:mt-0">
						{#if currentUser}
							<button type="button" class="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
								<div class="w-8 h-8 p-1 overflow-hidden border-2 border-gray-400 rounded-full">
									<img src="http://127.0.0.1:8090/api/files/_pb_users_auth_/szl0bq19gl5yoxh/{currentavatar}" class="object-cover w-full h-full" alt="avatar" />
								</div>

								<h3 class="mx-2 text-gray-700 dark:text-gray-200 lg:hidden">Khatab wedaa</h3>
							</button>
						{/if}
					</div>
				</div>
			</div>
			{#if $page.url.pathname === '/gallery'}
				<div class="py-3 mt-3 -mx-3 overflow-y-auto whitespace-nowrap scroll-hidden">
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">News</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Articles</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Videos</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Tricks</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">PHP</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Laravel</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Vue</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">React</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Tailwindcss</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Meraki UI</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">CPP</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">JavaScript</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Ruby</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Mysql</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Pest</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">PHPUnit</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Netlify</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">VS Code</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">PHPStorm</a>
					<a class="mx-4 text-sm leading-5 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:underline md:my-0" href="/">Sublime</a>
				</div>
			{/if}
		</div>
	</nav>
</div>
