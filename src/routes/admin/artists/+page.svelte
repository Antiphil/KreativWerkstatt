<script lang="ts">
	import { goto } from '$app/navigation';
	import { enhance } from '$app/forms';
	import { formatRelative, subDays } from 'date-fns';
	import { de } from 'date-fns/locale';
	import * as Table from '$lib/components/ui/table';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';

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
						<AlertDialog.Root>
							<AlertDialog.Trigger><i class="fa-solid fa-trash"></i></AlertDialog.Trigger>
							<AlertDialog.Content>
								<AlertDialog.Header>
									<AlertDialog.Title>Bist du dir sicher?</AlertDialog.Title>
									<AlertDialog.Description>Möchtest du <span class="font-extrabold text-red-500">{artist.firstname} {artist.lastname}</span> wirklich aus der Beschäftigten Liste löschen?</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<form method="POST" use:enhance on:submit={() => toast.success('Der Beschäftigte wurde erfolgreich gelöscht.')}>
										<AlertDialog.Cancel>Abbrechen</AlertDialog.Cancel>
										<AlertDialog.Action type="submit">Löschen</AlertDialog.Action>
										<input type="hidden" class="hidden" name="id" value={artist.id} />
									</form>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</Table.Head>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
