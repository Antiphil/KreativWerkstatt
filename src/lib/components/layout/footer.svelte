<script lang="ts">
	import logo from '$lib/assets/images/KreaWe_white.svg';
</script>

<footer class="bg-primary dark:bg-gray-900 text-white">
	<div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
		<a href="/">
			<img class="w-auto h-7 scale-[1.35] hover:scale-150 transition-all sepia" src={logo} alt="" />
		</a>

		<span class="text-xs uppercase text-center">©Copyright 2024. All Rights Reserved <br /> <a href="/impressum" class="text-primary-foreground underline hover:text-white transition-all">Impressum</a> • Website by <a href="https://www.philstack.de" class="hover:text-white transition-all text-primary-foreground underline" target="_blank">Philstack</a></span>

		<div class="flex -mx-2">
			<a href="https://lebenshilfe-suedthueringen.de/" target="_blank" class="mx-2 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
				<i class="fa-solid fa-house"></i>
			</a>

			<a href="https://www.facebook.com/KreativWerkstattMeiningen" target="_blank" class="mx-2 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
				<i class="fa-brands fa-facebook"></i>
			</a>

			<a href="https://www.instagram.com/kreativ.werkstatt.meiningen" target="_blank" class="mx-2 transition-colors duration-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
				<i class="fa-brands fa-instagram"></i>
			</a>
		</div>
	</div>
</footer>
