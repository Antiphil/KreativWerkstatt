<script lang="ts">
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { browser } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let preview: string[] = [];
	let files: File[] = [];
	let loading = false;

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	const handleFileChange = async (event: Event) => {
		loading = true;
		const target = event.target as HTMLInputElement;
		const selectedFiles = target.files;
		if (selectedFiles) {
			const filesArray = Array.from(selectedFiles);
			files = files.concat(filesArray);
			const base64Array = await Promise.all(filesArray.map((file) => getBase64(file)));
			preview = preview.concat(base64Array as string[]);
		}
		if (target.files) {
			formData.update((formValues) => {
				formValues.images = files;
				return formValues;
			});
		}
		loading = false;
	};

	const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const removeImage = (index: number) => {
		preview.splice(index, 1);
		files.splice(index, 1);
		preview = [...preview];
		formData.update((formValues) => {
			formValues.images = files;
			return formValues;
		});
	};
</script>

{#if browser}
	<SuperDebug data={$formData} />
{/if}

<form method="POST" enctype="multipart/form-data" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Titel des Produkts</Form.Label>
			<Form.Description>Gib dem Produkt einen passenden Namen</Form.Description>
			<Input placeholder="Tonkugel mit Blumenverzierung" {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="artists">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Name der beteiligten Beschäftigten</Form.Label>
			<Form.Description>Bitte gib an, wer am Produkt mitgearbeitet hat</Form.Description>
			<Form.FieldErrors />
			<Input placeholder="Richard Brettschneider, Sebastian Zapf, ..." {...attrs} bind:value={$formData.artists} />
		</Form.Control>
	</Form.Field>

	<Form.Field {form} name="images">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Bilder Hochladen</Form.Label>
			<Form.Description>Wähle bis zu 4 Bilder des Produktes, die du hochladen möchtest</Form.Description>
			<Form.FieldErrors />
			<Input type="file" multiple {...attrs} name="images" accept="image/png, image/jpeg, image/jpg" on:change={handleFileChange} />
		</Form.Control>
	</Form.Field>

	<div class="flex flex-col gap-3 justify-center">
		{#await Promise.resolve(loading) then}
			{#if loading}
				<p>Loading...</p>
			{/if}
			{#if !loading && preview.length > 0}
				<div class="flex justify-center mt-5 gap-3 [&>div]:first:border-4 first:[&>div]:border-red-500">
					{#each preview as image, index}
						<div class="w-24 h-24 border rounded-lg relative">
							<img src={image} alt="Preview" class="w-full h-full object-cover rounded-lg" />
							<button on:click={() => removeImage(index)} type="button" class="text-red-400 fa-solid fa-trash absolute top-1 right-1"></button>
						</div>
					{/each}
				</div>
				<span class="">Das erste Bild mit dem roten Rahmen dient als Vorschaubild für das ganze Produkt</span>
			{/if}
		{/await}
	</div>

	<Form.Button>Submit</Form.Button>
</form>
