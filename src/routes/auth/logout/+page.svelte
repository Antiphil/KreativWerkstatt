<script>
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { currentUser } from '$lib/stores/user';

	$: currentUser.set(null);

	export let data;
	toast.success(data.message);

	goto('/');
</script>

<h2 class="text-xl font-bold text-center w-full mt-20">Erfolgreich ausgeloggt. Du wirst weitergeleitet, bitte warte einen Moment!</h2>
<h2 class="font-bold text-center w-full mt-5">
	Falls du nicht weitergeleitet wirst, klicke bitte unten auf den Button.
	<br />
	<Button on:click={() => goto('/')}>Zurück zur Startseite</Button>
</h2>
