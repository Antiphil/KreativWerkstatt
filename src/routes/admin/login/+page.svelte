<script lang="ts">
	import logo from '$lib/assets/images/KreaWe.svg';
	import banner from '$lib/assets/images/banner.jpg';
</script>

<div class="flex justify-center h-[calc(100%-72px)] items-center bg-black/40">
	<div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
		<div class="hidden bg-cover bg-center lg:block lg:w-1/2" style="background-image: url('{banner}');"></div>

		<div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
			<div class="flex justify-center mx-auto">
				<img class="w-auto h-20" src={logo} alt="" />
			</div>

			<p class="mt-3 text-xl text-center text-gray-600">Willkommen zurück! 😊</p>

			<div class="mt-4">
				<label class="block mb-2 text-sm font-medium text-gray-600" for="LoggingEmailAddress">Nutzername</label>
				<input id="LoggingEmailAddress" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" />
			</div>

			<div class="mt-4">
				<div class="flex justify-between">
					<label class="block mb-2 text-sm font-medium text-gray-600" for="loggingPassword">Passwort</label>
				</div>

				<input id="loggingPassword" class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" />
			</div>

			<div class="mt-6">
				<button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"> Einloggen </button>
			</div>
		</div>
	</div>
</div>
