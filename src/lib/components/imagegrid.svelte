<script>
    import ph1 from "$lib/assets/images/placeholder/1.jpeg"
    import ph2 from "$lib/assets/images/placeholder/2.jpeg"
    import ph3 from "$lib/assets/images/placeholder/3.jpeg"
    import ph4 from "$lib/assets/images/placeholder/4.jpeg"
    import ph5 from "$lib/assets/images/placeholder/5.jpeg"
    import ph6 from "$lib/assets/images/placeholder/6.jpeg"
    import Image from "./image.svelte";
</script>

<div class="flex flex-wrap px-1">
    <div class="column flex-[0_0_50%] px-1 [&>img]:mt-2 [&>img]:align-middle">
        <Image img={ph1} />
        <Image img={ph2} />
        <Image img={ph3} />
        <Image img={ph4} />
        <Image img={ph5} />
        <Image img={ph6} />
    </div>
    <div class="column flex-[0_0_50%] px-1 [&>img]:mt-2 [&>img]:align-middle">
        <Image img={ph4} />
        <Image img={ph1} />
        <Image img={ph6} />
        <Image img={ph5} />
        <Image img={ph2} />
        <Image img={ph3} />
    </div>
</div>

<style>
    .column > :global(button) {
		margin-top: 8px;
        vertical-align: middle;
        width: 100%;
	}
    @media screen and (max-width: 800px) {
    .column {
        flex: 50%;
        max-width: 50%;
    }
    }
    @media screen and (max-width: 600px) {
    .column {
        flex: 100%;
        max-width: 100%;
    }
    }
</style>