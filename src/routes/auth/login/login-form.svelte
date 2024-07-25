<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';

	export let data: SuperValidated<Infer<FormSchema>>;

	const promise = new Promise((resolve, reject) =>
		setTimeout(() => {
			if (Math.random() > 0.5) {
				resolve({ name: 'Svelte Sonner' });
			} else {
				reject();
			}
		}, 3500)
	);

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

<form method="POST" use:enhance>
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
