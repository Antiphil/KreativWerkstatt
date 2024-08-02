<script lang="ts">
	import logo from '$lib/assets/images/KreaWe.svg';
	import banner from '$lib/assets/images/banner.jpg';
	import { applyAction, enhance } from '$app/forms';
	import type { PageData } from './$types.js';
	import LoginForm from './login-form.svelte';
	export let data: PageData;
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex justify-center h-[calc(100vh-72px)] items-center">
	<div class="flex w-full max-w-sm mx-auto overflow-hidden bg-[#fffde8] rounded-lg shadow-lg lg:max-w-4xl">
		<div class="hidden bg-cover bg-center lg:block lg:w-1/2" style="background-image: url('{banner}');"></div>

		<div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
			<div class="flex justify-center mx-auto">
				<img class="w-auto h-20" src={logo} alt="" />
			</div>

			<p class="mt-3 text-xl text-center text-gray-600 mb-3">Willkommen zurück! 😊</p>

			<LoginForm data={data.form} />
		</div>
	</div>
</div>
