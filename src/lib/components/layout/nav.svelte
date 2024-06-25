<script lang="ts">
	import logo from '$lib/assets/images/KreaWe.svg';
</script>

<nav class="bg-white shadow">
	<div class="container px-6 py-4 mx-auto">
		<div class="lg:flex lg:items-center">
			<div class="flex items-center justify-between">
				<a href="#">
					<img class="w-auto h-6 sm:h-10" src={logo} alt="" />
				</a>

				<!-- Mobile menu button -->
				<div class="flex lg:hidden">
					<button type="button" class="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600" aria-label="toggle menu">
						<svg x-show="!isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
						</svg>

						<svg x-show="isOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>

			<div x-cloak :class="[isOpen ? 'translate-x-0 opacity-100 ' : 'opacity-0 -translate-x-full']" class="absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between">
				<div class="flex flex-col text-gray-600 capitalize lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
					<a href="#" class="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900">Wer wir sind</a>
					<a href="#" class="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900">Gallerie</a>
					<a href="#" class="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900">Anfahrt</a>
					<a href="#" class="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900">Kontakt</a>
					<a href="#" class="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900">Impressum</a>
				</div>

				<div class="flex justify-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
					<a href="#" class="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500" aria-label="Reddit">
						<i class="fa-brands fa-facebook"></i>
					</a>

					<a href="#" class="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500" aria-label="Facebook">
						<i class="fa-brands fa-instagram"></i>
					</a>

					<a href="#" class="mx-2 text-gray-600 transition-colors duration-300 transform hover:text-gray-500" aria-label="Github">
						<svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<i class="fa-brands fa-tiktok"></i>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>
</nav>
