<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="text-[#353338]">
	<div class="container px-6 py-12 mx-auto">
		<div>
			<p class="font-medium text-secondary">So erreichst du uns</p>

			<h1 class="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">Komm gern vorbei! 😊</h1>

			<p class="mt-3">Das Team der KreativWerkstatt freut sich auf dich!</p>
		</div>

		<div class="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-3">
			<div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
				<div>
					<span class="inline-block p-3 text-secondary rounded-full bg-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
						</svg>
					</span>

					<h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Telefon</h2>
					<p class="mt-2 text-sm">Mo-Do von 8:00 to 15:15 Uhr</p>
					<p class="mt-2 text-sm">Fr von 8:00 to 12:30 Uhr</p>
					<p class="mt-2 text-sm text-secondary">+49 3693 884774</p>
				</div>

				<div>
					<span class="inline-block p-3 text-secondary rounded-full bg-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
						</svg>
					</span>

					<h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Email</h2>
					<p class="mt-2 text-sm">Schreib uns ne' Mail und wir antworten dir so schnell wie möglich!</p>
					<!-- <p class="mt-2 text-sm text-secondary ">redaktion@lebenshilfe-suedthueringen.de</p> -->
					<p class="mt-2 text-sm text-secondary">dorothee.zeitz@lebenshilfe-suedthueringen.de</p>
				</div>

				<div>
					<span class="inline-block p-3 text-secondary rounded-full bg-white">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
						</svg>
					</span>

					<h2 class="mt-4 text-base font-medium text-gray-800 dark:text-white">Werkstatt</h2>
					<p class="mt-2 text-sm">Sag uns in der Werkstatt Hallo!</p>
					<p class="mt-2 text-sm text-secondary">Rohrer Str. 2b - 98617 Meiningen</p>
				</div>
			</div>

			<div class="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
				<iframe width="100%" height="100%" frameborder="0" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Rohrer%20Str%202b%20Meiningen+(KreativWerkstatt)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
			</div>
		</div>
	</div>
</section>
