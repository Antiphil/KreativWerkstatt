<script lang="ts">
	export let data;
</script>

<div class="grid gap-4 w-1/2 max-h-80">
	<div class="max-h-80 w-full">
		<img class="h-full w-full rounded-lg object-cover" src={data.post.images[0].url} alt="" />
	</div>
	<div class="grid grid-cols-5 gap-4">
		{#each data.post?.images as image}
			<div>
				<img class="aspect-square w-full rounded-lg" src={image?.url} alt="post preview" />
			</div>
		{/each}
	</div>
</div>
