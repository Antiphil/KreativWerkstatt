<script lang="ts">
	import { formatRelative, subDays } from 'date-fns';
	import { de } from 'date-fns/locale';
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import { goto } from '$app/navigation';
	export let data;
</script>

<div class="flex justify-between max-w-7xl m-auto mt-10 gap-3">
	<Button on:click={() => goto('/admin/artists')}>Beschäftigte Verwalten</Button>
	<Button on:click={() => goto('/admin/create-new-post')}>Neuen Post erstellen</Button>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl m-auto mt-5">
	<Table.Root class="bg-[#FFF]">
		<Table.Header>
			<Table.Row class="uppercase [&>*]:font-bold">
				<Table.Head class="w-[400px]">Post</Table.Head>
				<Table.Head>Künstler</Table.Head>
				<Table.Head>Tags</Table.Head>
				<Table.Head>Datum</Table.Head>
				<Table.Head class="text-right w-[50px]">Bearbeiten</Table.Head>
				<Table.Head class="text-right w-[50px]">Löschen</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.props.posts as post}
				<Table.Row>
					<Table.Head class="w-[400px]">{post.title}</Table.Head>
					<Table.Head class="flex flex-nowrap gap-2 items-center">
						{#each post.artists as artist}
							<span>{artist.firstname} {artist.lastname}</span>
						{/each}
					</Table.Head>
					<Table.Head>{post.categories}</Table.Head>
					<Table.Head>{formatRelative(subDays(post.created, 0), new Date(), { locale: de })}</Table.Head>
					<Table.Head class="text-center w-[50px]"><i class="fa-solid fa-pen-to-square"></i></Table.Head>
					<Table.Head class="text-center w-[50px]"><i class="fa-solid fa-trash"></i></Table.Head>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
