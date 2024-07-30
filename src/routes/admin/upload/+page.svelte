<script lang="ts">
	import type { PageData } from './$types.js';
	import UploadForm from './upload-form.svelte';
	
	export let data: PageData;
</script>

<div class="max-w-3xl flex flex-col justify-center mx-auto">
	<h1>Neuen Post erstellen</h1>
	<UploadForm data={data.form} />
</div>
