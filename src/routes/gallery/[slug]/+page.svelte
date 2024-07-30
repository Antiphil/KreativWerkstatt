<script lang="ts">
	export let data;
</script>

<div class="grid gap-4 w-1/2 max-h-80">
	<div class="max-h-80 w-full">
		<img class="h-full w-full rounded-lg object-cover" src="" alt="" />
	</div>
	<div class="grid grid-cols-5 gap-4">
		{#each data.props.posts.images as image}
			<div>
				<img class="aspect-square w-full rounded-lg" src="http://127.0.0.1:8090/api/files/posts/{data.props.slug}/{image}" alt="post preview" />
			</div>
		{/each}
	</div>
</div>
