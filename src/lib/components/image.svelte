<script>
    import { imgOpen } from "../stores/imgmodal";
    export let alt
    export let img
    export let name
</script>


<button on:click={() => imgOpen.set(true)}>
    <img src={img} alt={alt} loading="lazy" class="w-full h-full object-fill">
</button>