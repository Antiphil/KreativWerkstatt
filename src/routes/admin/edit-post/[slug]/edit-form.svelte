<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import SuperDebug, { type Infer, type SuperValidated, superForm, fileProxy } from 'sveltekit-superforms';
	import { browser } from '$app/environment';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { categories, artists } from '../../create-new-post/schema';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema),
		onUpdated({ form }) {
			if (form.message) {
				toast.success(form.message);
				goto('/admin');
			}
		}
	});

	const { form: formData, message, enhance } = form;

	function addItemArtist(id: string) {
		$formData.artists = [...$formData.artists, id];
	}
	function removeItemArtist(id: string) {
		$formData.artists = $formData.artists.filter((i) => i !== id);
	}
	function addItem(id: string) {
		$formData.categories = [...$formData.categories, id];
	}
	function removeItem(id: string) {
		$formData.categories = $formData.categories.filter((i) => i !== id);
	}
	const file = fileProxy(form, 'newImage');
</script>

{#if browser}
	<SuperDebug data={$formData} />
{/if}

<form method="POST" use:enhance action="?/edit" enctype="multipart/form-data">
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label class="text-base mb-0">Titel des Produkts</Form.Label>
			<Form.Description>Wähle einen passenden Namen für das Produkt</Form.Description>
			<Input {...attrs} bind:value={$formData.title} />
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset {form} name="categories" class="space-y-0">
		<div class="mb-3">
			<Form.Legend class="text-base">Kategorien</Form.Legend>
			<Form.Description>Wähle die Kategorien die dein gewähltes Produkt am besten treffen</Form.Description>
		</div>
		<div class="space-y-2">
			{#each categories as item}
				{@const checked = $formData.categories.includes(item.id)}
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

	<h1 class="my-3">Beteilige Mitarbeiter</h1>
	<Form.Fieldset {form} name="artists" class="space-y-0">
		<div class="mb-3">
			<Form.Legend class="text-base">Mitarbeiter</Form.Legend>
			<Form.Description>Bitte kreuze an, wer an dem Produkt mitgearbeitet hat.</Form.Description>
		</div>
		<div class="space-y-2">
			{#each artists as item}
				{@const checked = $formData.artists.includes(item.id)}
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

	<h1 class="my-3">Schritt 3: Bildauswahl</h1>

	<Form.Field {form} name="newImage">
		<Form.Control let:attrs>
			<Form.Label class="font-bold">Neues Bild hinzufügen</Form.Label>
			<Form.Description>An dieser Stelle kannst du nur einzelne Bilder hinzufügen</Form.Description>
			<Form.FieldErrors />
			<Input type="file" {...attrs} name="newImage" bind:value={$file} accept="image/png, image/jpeg, image/jpg" />
		</Form.Control>
	</Form.Field>

	<div class="flex max-h-32 gap 3">
		{#each $formData.images as img}
			<img class="h-auto max-w-xs" src="http://127.0.0.1:8090/api/files/posts/{$formData.id}/{img}" alt="" />
		{/each}
	</div>

	<Form.Button>Einstellungen speichern</Form.Button>
</form>
