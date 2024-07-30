<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';
	import ArtistForm from './artist-form.svelte';

	export let data: PageData;
</script>

<div class="flex justify-end max-w-7xl m-auto mt-10 gap-3">
	<Button on:click={() => goto('/admin/artists')}>Zurück zur Übersicht</Button>
</div>
<div class=" max-w-7xl m-auto">
	<ArtistForm data={data.form} />
</div>
