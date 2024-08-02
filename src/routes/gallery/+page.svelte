<script lang="ts">
	import { categories } from '../admin/create-new-post/schema';
	import { clickOutside } from '$lib/utils/clickoutside';

	export let data;
	console.log(data.props.posts);

	let filterOpen: Boolean = false;
</script>

<div class="container !px-0">
	<div>
		<main class="">
			<div class="flex items-baseline justify-between border-b border-white pb-6">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900">Unsere Produkte</h1>

				<div class="flex items-center">
					<div class="relative inline-block text-left">
						<div>
							<button type="button" on:click={() => (filterOpen = true)} class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
								Sortierung
								<svg class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
								</svg>
							</button>
						</div>
						{#if filterOpen}
							<div use:clickOutside on:click_outside={() => (filterOpen = false)} class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
								<div class="py-1" role="none">
									<a href="#" on:click={() => (filterOpen = false)} class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">Älteste zuerst</a>
									<a href="#" on:click={() => (filterOpen = false)} class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Neueste zuerst</a>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<section aria-labelledby="products-heading" class="pb-24 pt-6">
				<h2 id="products-heading" class="sr-only">Products</h2>

				<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
					<!-- Filters -->
					<form class="hidden lg:block">
						<div class="border-b border-white py-6">
							<h3 class="-my-3 flow-root">
								<!-- Expand/collapse section button -->
								<button type="button" class="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
									<span class="font-medium text-gray-900">Kategorien</span>
								</button>
							</h3>
							<!-- Filter section, show/hide based on section state. -->
							<div class="pt-6" id="filter-section-0">
								<div class="space-y-4">
									{#each categories as categorie, index}
										<div class="flex items-center">
											<input id={categorie.id} type="checkbox" class="h-4 w-4 rounded border-gray-800 border-1 text-secondary focus:ring-indigo-500" />
											<label for={categorie.id} class="ml-3 text-sm">{categorie.label}</label>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</form>

					<!-- Product grid -->
					<div class="lg:col-span-4">
						<div class="columns-1 md:columns-2 xl:columns-3 gap-7 p-3">
							{#if data.props.posts.length > 1}
								{#each data.props.posts as post}
									<a href="/gallery/post/{post.id}">
										<div class=" break-inside-avoid mb-8 rounded-2xl overflow-hidden border-4 border-white/60 bg-white">
											<img class="h-auto max-w-full w-full rounded-lg hover:scale-[1.03] transition-all" src="http://127.0.0.1:8090/api/files/posts/{post.id}/{post.images[0]}" alt={post.title} />
										</div>
									</a>
								{/each}
							{:else}
								loading gallery
							{/if}
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</div>
