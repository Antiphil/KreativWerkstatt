<script lang="ts">
	import logo from '$lib/assets/images/KreaWe.svg';
</script>

<footer class="bg-white dark:bg-gray-900">
	<div class="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
		<a href="/">
			<img class="w-auto h-7" src={logo} alt="" />
		</a>

		<span class="text-xs uppercase text-gray-600 text-center">©Copyright 2024. All Rights Reserved <br /> <a href="/impressum">Impressum</a> • <a href="https://www.philstack.de" class="" target="_blank">Website by Philstack</a></span>

		<div class="flex -mx-2">
			<a href="https://lebenshilfe-suedthueringen.de/" target="_blank" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
				<i class="fa-solid fa-house"></i>
			</a>

			<a href="https://www.facebook.com/KreativWerkstattMeiningen" target="_blank" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
				<i class="fa-brands fa-facebook"></i>
			</a>

			<a href="https://www.instagram.com/kreativ.werkstatt.meiningen" target="_blank" class="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
				<i class="fa-brands fa-instagram"></i>
			</a>
		</div>
	</div>
</footer>
