<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onResult: () => {
			toast.success('Der Beschäftigte wurde erfolgreich hinzugefügt');
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-3">
	<Form.Field {form} name="firstname">
		<Form.Control let:attrs>
			<Form.Label>Vorname des Beschäftigten</Form.Label>
			<Form.FieldErrors />
			<Input {...attrs} placeholder="Dorothee" bind:value={$formData.firstname} />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="lastname">
		<Form.Control let:attrs>
			<Form.Label>Nachname des Beschäftigten</Form.Label>
			<Form.FieldErrors />
			<Input {...attrs} placeholder="Zeitz" bind:value={$formData.lastname} />
		</Form.Control>
	</Form.Field>
	<Form.Button>Hinzufügen</Form.Button>
</form>
