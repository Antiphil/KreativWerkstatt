<!-- <script lang="ts">
	export let data;

	console.log(data);
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl m-auto mt-20">
	{#each data.feed as item}
		<img class="h-auto max-w-full rounded-lg" src="/uploads/{item.id}/1.png" alt="" />
	{/each}
</div> -->

<script lang="ts">
	export let data;
	const images = data.feed;
	function chunkArray(array: any, size: any) {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	}
	let imageUrls = images.map((image) => `/uploads/${image.id}/1.png`);
	let imageGroups = chunkArray(imageUrls, 3);
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl m-auto mt-20">
	{#each imageGroups as group}
		<div class="grid gap-4">
			{#each group as imageUrl}
				<div>
					<img class="h-full w-full rounded-lg object-cover" src={imageUrl} alt="" />
				</div>
			{/each}
		</div>
	{/each}
</div>
