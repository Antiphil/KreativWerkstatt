<script>
	export let data;
	console.log(data.props.posts);
</script>

<div class="post-grid">
	{#if data.props.posts.length > 1}
		{#each data.props.posts as post}
			<div class="post-card">
				<a href={`/gallery/${post.id}`}>
					<img src="http://127.0.0.1:8090/api/files/posts/{post.id}/{post.images[0]}" alt={post.title} />
					<div>{post.title}</div>
				</a>
			</div>
		{/each}
	{:else}
		loading gallery
	{/if}
</div>

<style>
	.post-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
	.post-card {
		width: 200px;
		border: 1px solid #ddd;
		border-radius: 8px;
		overflow: hidden;
		text-align: center;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}
	.post-card img {
		width: 100%;
		height: auto;
	}
	.post-card a {
		display: block;
		text-decoration: none;
		color: #333;
		padding: 8px;
	}
</style>
