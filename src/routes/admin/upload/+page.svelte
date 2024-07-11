<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	let preview: string[] = [];
	let files: File[] = [];
	let loading = false;
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

		try {
			const response = await fetch('/admin/upload', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Upload successful:', result);
				dispatch('uploadSuccess', result);
			} else {
				console.error('Upload failed:', response.statusText);
			}
		} catch (error) {
			console.error('Error uploading images:', error);
		}
	};
</script>

<input type="file" name="file" id="file" multiple on:change={handleFiles} />
{#await Promise.resolve(loading) then}
	{#if loading}
		<p>Loading...</p>
	{/if}
	{#if !loading && preview.length > 0}
		<div>
			{#each preview as image, index}
				<div style="display: inline-block; position: relative;">
					<img src={image} alt="Preview" style="max-width: 200px; max-height: 200px;" />
					<button on:click={() => removeImage(index)} style="position: absolute; top: 5px; right: 5px;">Delete</button>
				</div>
			{/each}
		</div>
		<button on:click={submitImages}>Submit Images</button>
	{/if}
{/await}
