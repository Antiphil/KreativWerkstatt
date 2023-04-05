<script>
    import ph1 from "$lib/assets/images/placeholder/1.jpeg"
    import ph2 from "$lib/assets/images/placeholder/2.jpeg"
    import ph3 from "$lib/assets/images/placeholder/3.jpeg"
    import ph4 from "$lib/assets/images/placeholder/4.jpeg"
    import ph5 from "$lib/assets/images/placeholder/5.jpeg"
    import ph6 from "$lib/assets/images/placeholder/6.jpeg"
    import Image from "./image.svelte";
</script>

<div class="row">
    <div class="column">
        <Image img={ph1} />
        <Image img={ph2} />
        <Image img={ph3} />
        <Image img={ph4} />
        <Image img={ph5} />
        <Image img={ph6} />
    </div>
    <div class="column">
        <Image img={ph4} />
        <Image img={ph1} />
        <Image img={ph6} />
        <Image img={ph5} />
        <Image img={ph2} />
        <Image img={ph3} />
    </div>
    <div class="column">
        <Image img={ph2} />
        <Image img={ph5} />
        <Image img={ph1} />
        <Image img={ph3} />
        <Image img={ph2} />
        <Image img={ph3} />
    </div>
    <div class="column">
        <Image img={ph4} />
        <Image img={ph5} />
        <Image img={ph6} />
        <Image img={ph5} />
        <Image img={ph2} />
        <Image img={ph1} />
    </div>
</div>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  padding: 0 4px;
}
.column {
  flex: 25%;
  max-width: 25%;
  padding: 0 4px;
}
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