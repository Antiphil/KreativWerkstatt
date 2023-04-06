<script>
    import { imgOpen, imgSrc } from "../stores/imgmodal";
    export let alt
    export let img
    export let name

    const openModal = () => {
        imgSrc.set(img)
        imgOpen.set(true)
    }
</script>


<button on:click={() => openModal()}>
    <img src={img} alt={alt} loading="lazy" class="w-full h-full object-fill">
</button>