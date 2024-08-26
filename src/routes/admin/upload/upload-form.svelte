<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { zod } from 'sveltekit-superforms/adapters';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button/index.js';
	import { artistStore, titleStore, imageStore, categorieStore } from '$lib/stores/upload';
	import { categories, artists } from './schema';
	import * as Form from '$lib/components/ui/form/index.js';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { browser } from '$app/environment';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});
	const { form: formData, enhance, validateForm, validate } = form;

	let checked = false;
	let preview: string[] = [];
	let step = 1;
	let loading = false;

	/* Multi Step Form clases */
	let finishedRing = '<span class="w-8 h-8 bg-green-500 border-2 border-transparent rounded-full flex justify-center items-center mr-3 text-sm text-white lg:w-10 lg:h-10"><svg class="w-5 h-5 stroke-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12L9.28722 16.2923C9.62045 16.6259 9.78706 16.7927 9.99421 16.7928C10.2014 16.7929 10.3681 16.6262 10.7016 16.2929L20 7" stroke="stroke-current" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" class="my-path"></path></svg></span>';
	let currentRing = 'w-8 h-8 bg-stone-100 border-2 border-green-500 rounded-full flex justify-center items-center mr-3 text-sm text-primary lg:w-10 lg:h-10';
	let nextRing = 'w-8 h-8 bg-stone-50 border-2 border-stone-200 rounded-full flex justify-center items-center mr-3 text-sm lg:w-10 lg:h-10';

	/* Image Upload & Preview */
	const handleFileChange = async (event: Event) => {
		loading = true;
		const target = event.target as HTMLInputElement;
		const selectedFiles = target.files;

		if (selectedFiles) {
			const filesArray = Array.from(selectedFiles);
			$imageStore = $imageStore.concat(filesArray);
			const base64Array = await Promise.all(filesArray.map((file) => getBase64(file)));
			preview = preview.concat(base64Array as string[]);
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
		/* Remove Images from Preview */
		preview.splice(index, 1);
		preview = [...preview];
		/* Remove Images from Store */
		$imageStore.splice(index, 1);
		$imageStore = [...$imageStore];
	};

	/* Submit Form */
	const handleSubmit = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const data = new FormData();
		data.append('title', $formData.productTitle);
		data.append('categorie', $formData.categorie);
		$imageStore.forEach((image: File) => {
			data.append('images', image);
		});
		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: data
		});
	};

	const nextStep = async () => {
		if (step === 1) {
			let valTitle = await validate('productTitle', { update: 'errors' });
			let valCategorie = await validate('categorie', { update: 'errors' });
			console.log(valCategorie);
			if (valTitle === undefined && valCategorie === undefined && step < 3) {
				step += 1;
				return;
			}
		}
		if (step === 2) {
			step += 1;
		}
	};
	const lastStep = () => {
		if (step > 1) {
			step -= 1;
		}
	};
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
</script>

<div class="flex border-2 m-10 rounded-xl bg-primary-foreground">
	<ol class="overflow-hidden space-y-8 bg-primary/20 p-10 rounded-l-xl">
		<li>
			<a href="/" class="flex items-center font-medium w-full">
				{#if step > 1}
					{@html finishedRing}
				{:else}
					<span class={currentRing}>1</span>
				{/if}
				<div class="block">
					<h4 class="text-lg text-primary">Schritt 1</h4>
					<span class="text-sm">Titel & Produktkategorie</span>
				</div>
			</a>
		</li>
		<li>
			<a href="/" class="flex items-center font-medium w-full">
				{#if step > 2}
					{@html finishedRing}
				{:else if step > 1}
					<span class={currentRing}>2</span>
				{:else}
					<span class={nextRing}>2</span>
				{/if}
				<div class="block">
					<h4 class="text-lg text-primary">Schritt 2</h4>
					<span class="text-sm">Künstler</span>
				</div>
			</a>
		</li>

		<li>
			<a href="/" class="flex items-center font-medium w-full">
				{#if step > 3}
					{@html finishedRing}
				{:else if step > 2}
					<span class={currentRing}>3</span>
				{:else}
					<span class={nextRing}>3</span>
				{/if}
				<div class="block">
					<h4 class="text-lg text-primary">Schritt 3</h4>
					<span class="text-sm">Bilder Hochladen</span>
				</div>
			</a>
		</li>
	</ol>
	<div class="px-10 flex-1 flex flex-col gap-5 p-10">
		<form method="POST" on:submit|preventDefault={handleSubmit} enctype="multipart/form-data" use:enhance>
			{#if step === 1}
				<div class="">
					<h1 class="text-xl font-bold">Schritt 1:</h1>
					<h2 class="font-bold">Titel & Produktkategorie</h2>
				</div>

				<Form.Field {form} name="productTitle">
					<Form.Control let:attrs>
						<Form.Label class="text-base mb-0">Titel des Produkts</Form.Label>
						<Form.Description>Wähle einen passenden Namen für das Produkt</Form.Description>
						<Input {...attrs} bind:value={$formData.productTitle} placeholder="Tonkugel mit Blumenmuster" />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>

				<div class="flex flex-col gap-2">
					<Label class="mb-1 font-semibold">Produktkategorie</Label>
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
				</div>
			{:else if step === 2}
				<div class="">
					<h1 class="text-xl font-bold">Schritt 2:</h1>
					<h2 class="font-bold">Wer hat daran mitgearbeitet?</h2>
				</div>
				<div class="flex flex-col gap-2">
					<Label class="mb-1 font-semibold">Beteilige beschäftigte</Label>
					<div class="flex items-center space-x-2">
						<Checkbox id="richard" />
						<Label for="richard" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Richard Brettschneider</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id="sven" />
						<Label for="sven" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Sven Gögel</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id="phil" />
						<Label for="phil" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Philipp Stehle</Label>
					</div>
					<div class="flex items-center space-x-2">
						<Checkbox id="bodo" />
						<Label for="bodo" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Bodo Wehrbach</Label>
					</div>
				</div>
			{:else if step === 3}
				<div class="">
					<h1 class="text-xl font-bold">Schritt 3:</h1>
					<h2 class="font-bold">Bilder hochladen</h2>
				</div>

				<Input type="hidden" value={$titleStore} id="title" name="title" placeholder="Tonkugel mit Blumenmuster" />

				<div class="flex flex-col gap-2">
					<div class=" sm:px-8 md:px-16 sm:py-8">
						<div class="mx-auto max-w-screen-lg h-full">
							<!-- file upload modal -->
							<div aria-label="File Upload Modal" class="relative h-full flex flex-col">
								<!-- scroll area -->
								<section class="h-full overflow-auto p-8 w-full flex flex-col">
									<label for="images" class="rounded-xl cursor-pointer hover:bg-black/10 border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
										<p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
											<span>Klicke hier um Bilder für den Post auszuwählen</span>
										</p>
										<input on:change={handleFileChange} id="images" name="images" type="file" multiple accept="image/png, image/jpeg, image/jpg" class="hidden" />
										<Button disabled>Bilder auswählen</Button>
									</label>
									<h1 class="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">Bildervorschau</h1>
									{#if preview.length !== 0}
										{#await Promise.resolve(loading) then}
											{#if loading}
												<p>Loading...</p>
											{/if}
											{#if !loading && preview.length > 0}
												<div class="flex justify-center flex-wrap mt-5 gap-3 [&>div]:first:border-4 first:[&>div]:border-red-500">
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
									{:else}
										<ul id="gallery" class="flex flex-1 flex-wrap -m-1">
											<li id="empty" class="h-full w-full text-center flex flex-col justify-center items-center">
												<img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
												<span class="text-small text-gray-500">Noch keine Bilder ausgewählt</span>
											</li>
										</ul>
									{/if}
								</section>
							</div>
						</div>
					</div>
				</div>
			{/if}
			<div class="flex justify-between mt-10">
				{#if step === 1}
					<Button disabled>Zurück</Button>
				{:else}
					<Button
						on:click={() => {
							lastStep();
						}}>Zurück</Button
					>
				{/if}
				{#if step < 3}
					<Button
						on:click={() => {
							nextStep();
						}}>Weiter</Button
					>
				{/if}
				{#if step === 3}
					<Form.Button>Hochladen</Form.Button>
				{/if}
			</div>
		</form>
	</div>
</div>
