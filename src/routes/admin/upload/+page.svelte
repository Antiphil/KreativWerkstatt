<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	let preview: string[] = [];
	let files: File[] = [];
	let loading = false;
	let artist: string = 'test';
	let title: string = 'test2';
	let titleerror: string | undefined = undefined;
	let artisterror: string | undefined = undefined;
	let fileerror: string | undefined = undefined;
	const dispatch = createEventDispatcher();

	const getBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});
	};

	const handleFiles = async (event: Event) => {
		loading = true;
		const input = event.target as HTMLInputElement;
		const selectedFiles = input.files;
		if (selectedFiles) {
			const filesArray = Array.from(selectedFiles);
			files = files.concat(filesArray);
			const base64Array = await Promise.all(filesArray.map((file) => getBase64(file)));
			preview = preview.concat(base64Array as string[]);
		}
		loading = false;
	};

	const removeImage = (index: number) => {
		preview.splice(index, 1);
		files.splice(index, 1);
		preview = [...preview]; // to trigger reactivity
	};

	const submitImages = async () => {
		const formData = new FormData();
		files.forEach((file) => formData.append('images', file));
		formData.append('title', title);
		formData.append('artist', artist);

		try {
			if (title === undefined) return (titleerror = 'Bitte gib einen Titel an!');
			if (artist === undefined) return (artisterror = 'Bitte gib die beteiligten beschäftigten an!');
			if (files.length === 0) return (fileerror = 'Bitte lade Bilder mit hoch!');
			const response = await fetch('/admin/upload', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Upload successful:', result);
				dispatch('uploadSuccess', result);
				goto('/admin/upload/success');
			} else {
				console.error('Upload failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error uploading images:', error);
		}
	};
</script>

<div class="my-10">
	<div class="flex items-center justify-center">
		<div class="mx-auto w-full max-w-3xl">
			<p class=" block text-xl font-semibold text-[#07074D]">Bild Informationen</p>
			<p class="mb-5 block text-sm font-medium text-[#6B7280]">Bitte bedenke das du hier nur ein einzelnes Produkt vorstellst. Gib also immer nur verschiedene Bilder vom selben Produkt an!</p>
			<div class="mb-5">
				<label for="title" class="block text-base font-medium text-[#07074D]"> Titel des Produkts </label>
				<label for="title" class="mb-3 block text-sm font-medium text-[#6B7280]"> Gib den Produkt einen pasenden Namen </label>
				<input type="text" name="title" id="title" required bind:value={title} placeholder="Beispiel: Tonkugel mit Blumenmuster" class="w-full rounded-md border border-[#cecece] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
				{#if titleerror}
					<p class="text-red-600">{titleerror}</p>
				{/if}
			</div>
			<div class="mb-5">
				<label for="artist" class="block text-base font-medium text-[#07074D]"> Name der beteiligten Beschäftigten </label>
				<label for="artist" class="mb-3 block text-sm font-medium text-[#6B7280]"> Bitte gib an, wer am Produkt mitgearbeitet hat </label>
				<input type="text" name="artist" id="artist" required bind:value={artist} placeholder="Beispiel: Richard Brettschneider, Sebastian Zapf" class="w-full rounded-md border border-[#cecece] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
				{#if artisterror}
					<p class="text-red-600">{artisterror}</p>
				{/if}
			</div>
			<div class="mb-6 pt-4">
				<p class=" block text-xl font-semibold text-[#07074D]">Bilder Hochladen</p>
				<label for="file" class="mb-5 block text-sm font-medium text-[#6B7280]"> Wähle bis zu 4 Bilder des Produktes das du hochladen möchtest </label>
				{#if fileerror}
					<p class="text-red-600">{fileerror}</p>
				{/if}
				<div class="mb-8">
					<input type="file" name="file" id="file" multiple accept=".png, .jpg, .jpeg" style="display: none" on:change={handleFiles} />
					<label for="file" class="relative flex min-h-[200px] items-center justify-center rounded-md border-2 border-dashed border-[#cecece] p-12 text-center">
						<div>
							<span class="inline-flex rounded border border-[#cecece] py-2 px-7 text-base font-medium text-[#07074D] hover:bg-[#6A64F1] cursor-pointer hover:text-white transition-all"> Bilder Auswählen </span>
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
						</div>
					</label>
				</div>
			</div>

			<div>
				<button on:click={submitImages} class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"> Hochladen </button>
			</div>
		</div>
	</div>
</div>
