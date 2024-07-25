<script lang="ts">
	import { formatRelative, subDays } from 'date-fns';
	import { de } from 'date-fns/locale';
	/* 	export let data; */
</script>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-7xl m-auto mt-10">
	<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
			<tr>
				<th scope="col" class="px-6 py-3"> Post </th>
				<th scope="col" class="px-6 py-3"> Künstler </th>
				<th scope="col" class="px-6 py-3"> Hochgeladen </th>
				<th scope="col" class="px-6 py-3"> Löschen </th>
			</tr>
		</thead>
		<tbody>
			<!-- {#each data.feed as post}
				<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {post.title} </th>
					<td class="px-6 py-4"> {post.artists} </td>
					<td class="px-6 py-4"> {formatRelative(subDays(post.createdAt, 0), new Date(), { locale: de })} </td>
					<td class="px-6 py-4">
						<form action="?/delete" method="POST">
							<input class="hidden" type="text" value={post.id} name="id" id="id" />
							<button type="submit" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Löschen</button>
						</form>
					</td>
				</tr>
			{/each} -->
		</tbody>
	</table>
</div>
