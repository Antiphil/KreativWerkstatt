<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { formatRelative, subDays } from 'date-fns';
	import { de } from 'date-fns/locale';
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;
</script>

<div class="flex justify-end max-w-7xl m-auto mt-10 gap-3">
	<Button on:click={() => goto('/admin/artists/add')}>Neuen Beschäftigten hinzufügen</Button>
</div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl m-auto mt-5">
	<Table.Root class="bg-[#FFF]">
		<Table.Header>
			<Table.Row class="uppercase [&>*]:font-bold">
				<Table.Head class="">Vorname</Table.Head>
				<Table.Head class="">Nachname</Table.Head>
				<Table.Head class="text-right w-[50px]">Löschen</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each data.props.artists as artist}
				<Table.Row>
					<Table.Head class="">{artist.firstname}</Table.Head>
					<Table.Head class="">{artist.lastname}</Table.Head>
					<Table.Head class="text-center w-[50px]">
						<form method="POST" action="?/delete" use:enhance>
							<button class="fa-solid fa-trash"></button>
							<input type="text" name="id" value={artist.id} class="hidden" />
						</form>
					</Table.Head>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
