<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/utils.js';

	type $$Props = HTMLAttributes<HTMLTableRowElement> & {
		'data-state'?: unknown;
	};

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<tr class={cn('hover:bg-black/20 odd:bg-black/10 data-[state=selected]:bg-muted border-b border-primary-foreground transition-colors', className)} {...$$restProps} on:click on:keydown>
	<slot />
</tr>
