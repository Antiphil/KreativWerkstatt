<script lang="ts">
	import Nav from '$lib/components/layout/nav.svelte';
	import '../app.css';
	import { applyAction, enhance } from '$app/forms';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { PageData } from './$types';
</script>

<div class="h-full">
	<Nav />

	<slot />
</div>
<Toaster />
