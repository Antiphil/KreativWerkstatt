<script lang="ts">
	import type { PageData } from './$types.js';
	import UploadForm from './upload-form.svelte';
	export let data: PageData;
</script>

<UploadForm data={data.form} />
