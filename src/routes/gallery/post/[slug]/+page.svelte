<script lang="ts">
	export let data;
</script>

<div class="">
	<div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
		<div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
			<!-- Image gallery -->
			<div class="flex flex-col-reverse">
				<!-- Image selector -->
				<div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
					<div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
						<button id="tabs-1-tab-1" class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4" aria-controls="tabs-1-panel-1" role="tab" type="button">
							<span class="sr-only">Angled view</span>
							{#each data.props.posts.images as image}
								<span class="absolute inset-0 overflow-hidden rounded-md">
									<img src="http://127.0.0.1:8090/api/files/posts/{data.props.slug}/{image}" alt="" class="h-full w-full object-cover object-center" />
								</span>
							{/each}

							<!-- Selected: "ring-indigo-500", Not Selected: "ring-transparent" -->
							<span class="ring-transparent pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2" aria-hidden="true"></span>
						</button>

						<!-- More images... -->
					</div>
				</div>

				<div class="aspect-h-1 aspect-w-1 w-full space-y-3">
					<!-- Tab panel, show/hide based on tab state. -->

					{#each data.props.posts.images as image}
						<div id="tabs-1-panel-1" aria-labelledby="tabs-1-tab-1" role="tabpanel" tabindex="0">
							<img src="http://127.0.0.1:8090/api/files/posts/{data.props.slug}/{image}" alt="Angled front view with bag zipped and handles upright." class="h-full w-full object-cover object-center sm:rounded-lg" />
						</div>
					{/each}

					<!-- More images... -->
				</div>
			</div>

			<!-- Product info -->
			<div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
				<h1 class="text-3xl font-bold tracking-tight text-gray-900">Zip Tote Basket</h1>

				<div class="mt-3">
					<h2 class="sr-only">Product information</h2>
					<p class="text-3xl tracking-tight text-gray-900">€140</p>
				</div>

				<!-- Reviews -->

				<div class="mt-6">
					<h3 class="sr-only">Description</h3>

					<div class="space-y-6 text-base text-gray-700">
						<p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
					</div>
				</div>

				<section aria-labelledby="details-heading" class="mt-12">
					<h2 id="details-heading" class="sr-only">Additional details</h2>
				</section>
			</div>
		</div>
	</div>
</div>

<div class="grid gap-4 w-1/2 max-h-80">
	<div class="max-h-80 w-full">
		<img class="h-full w-full rounded-lg object-cover" src="" alt="" />
	</div>
	<div class="grid grid-cols-5 gap-4"></div>
</div>
