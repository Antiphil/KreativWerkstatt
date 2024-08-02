<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { browser } from '$app/environment';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { tick } from 'svelte';
	import { categories, artists } from './schema';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	let step: number = 1;

	function addItem(id: string) {
		$formData.categorie = [...$formData.categorie, id];
	}

	function removeItem(id: string) {
		$formData.categorie = $formData.categorie.filter((i) => i !== id);
	}
	function addItemArtist(id: string) {
		$formData.artist = [...$formData.artist, id];
	}

	function removeItemArtist(id: string) {
		$formData.artist = $formData.artist.filter((i) => i !== id);
	}

	let preview: string[] = [];
	let files: File[] = [];
	let loading = false;

	const handleFileChange = async (event: Event) => {
		loading = true;
		const target = event.target as HTMLInputElement;

		const selectedFiles = target.files;

		if (selectedFiles) {
			const filesArray = Array.from(selectedFiles);
			files = files.concat(filesArray);
			const base64Array = await Promise.all(filesArray.map((file) => getBase64(file)));
			preview = preview.concat(base64Array as string[]);
			formData.update((formValues) => {
				formValues.images = Array.from(target.files as FileList) as File[];
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
		const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
		if (fileInput) {
			const dataTransfer = new DataTransfer();
			files.forEach((file) => dataTransfer.items.add(file));
			fileInput.files = dataTransfer.files;
		}
	};
</script>

{#if browser}
	<SuperDebug data={$formData} />
{/if}

<div class="mt-10 container">
	<ol class="flex items-center w-full">
		<li class="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
			<span class="flex items-center justify-center w-10 h-10 bg-blue-800 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
				<svg class="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
					<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
				</svg>
			</span>
		</li>
		<li class="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
			<span class="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full lg:h-12 lg:w-12 shrink-0">
				<svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
					<path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
				</svg>
			</span>
		</li>
		<li class="flex items-center">
			<span class="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full lg:h-12 lg:w-12 shrink-0">
				<svg class="w-4 h-4 text-gray-500 lg:w-5 lg:h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
					<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
				</svg>
			</span>
		</li>
	</ol>

	<form method="POST" use:enhance enctype="multipart/form-data">
		<!-- {#if step === 1} -->
		<h1 class="my-3">Schritt 1: Titel & Kategorie</h1>

		<Form.Field {form} name="productTitle">
			<Form.Control let:attrs>
				<Form.Label class="text-base mb-0">Titel des Produkts</Form.Label>
				<Form.Description>Wähle einen passenden Namen für das Produkt</Form.Description>
				<Input {...attrs} bind:value={$formData.productTitle} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>

		<Form.Fieldset {form} name="categorie" class="space-y-0">
			<div class="mb-3">
				<Form.Legend class="text-base">Kategorien</Form.Legend>
				<Form.Description>Wähle die Kategorien die dein gewähltes Produkt am besten treffen</Form.Description>
			</div>
			<div class="space-y-2">
				{#each categories as item}
					{@const checked = $formData.categorie.includes(item.id)}
					<div class="flex flex-row items-start space-x-3">
						<Form.Control let:attrs>
							<Checkbox
								{...attrs}
								{checked}
								onCheckedChange={(v) => {
									if (v) {
										addItem(item.id);
									} else {
										removeItem(item.id);
									}
								}}
							/>
							<Form.Label class="font-normal">
								{item.label}
							</Form.Label>
							<input hidden type="checkbox" name={attrs.name} value={item.id} {checked} />
						</Form.Control>
					</div>
				{/each}
				<Form.FieldErrors />
			</div>
		</Form.Fieldset>
		<!-- {/if}

		{#if step === 2} -->
		<h1 class="my-3">Schritt 2: Beteilige Mitarbeiter</h1>
		<Form.Fieldset {form} name="artist" class="space-y-0">
			<div class="mb-3">
				<Form.Legend class="text-base">Mitarbeiter</Form.Legend>
				<Form.Description>Bitte kreuze an, wer an dem Produkt mitgearbeitet hat.</Form.Description>
			</div>
			<div class="space-y-2">
				{#each artists as item}
					{@const checked = $formData.artist.includes(item.id)}
					<div class="flex flex-row items-start space-x-3">
						<Form.Control let:attrs>
							<Checkbox
								{...attrs}
								{checked}
								onCheckedChange={(v) => {
									if (v) {
										addItemArtist(item.id);
									} else {
										removeItemArtist(item.id);
									}
								}}
							/>
							<Form.Label class="font-normal">
								{item.firstname}
								{item.lastname}
							</Form.Label>
							<input hidden type="checkbox" name={attrs.name} value={item.id} {checked} />
						</Form.Control>
					</div>
				{/each}
				<Form.FieldErrors />
			</div>
		</Form.Fieldset>
		<!-- {/if}
		{#if step === 3} -->
		<h1 class="my-3">Schritt 3: Bildauswahl</h1>

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
		<!-- {/if} -->

		<div class="flex justify-between">
			<!-- {#if step <= 1}
				<Button disabled>Zurück</Button>
			{/if}
			{#if step >= 2}
				<Button on:click={() => (step -= 1)}>Zurück</Button>
			{/if}
			{#if step < 3}
				<Button on:click={() => (step += 1)}>Weiter</Button>
			{/if}
			{#if step >= 3} -->
			<Form.Button>Hochladen</Form.Button>
			<!-- {/if} -->
		</div>
	</form>
</div>
