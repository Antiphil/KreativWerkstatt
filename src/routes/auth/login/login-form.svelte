<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onSubmit: () => {
			toast.loading('Bitte warten...');
		},
		onResult: () => {
			toast.success('Du hast dich erfolgreich eingeloggt');
		},
		onError: (event) => {
			toast.error(`Etwas ist schief gelaufen. Versuch es bitte erneut.`);
		}
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-3">
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.FieldErrors />
			<Form.Label>Benutzername</Form.Label>
			<Input {...attrs} bind:value={$formData.username} />
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control let:attrs>
			<Form.Label>Passwort</Form.Label>
			<Input type="Password" {...attrs} bind:value={$formData.password} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Einloggen</Form.Button>
</form>
