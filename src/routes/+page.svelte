<script>
  import Button from "../lib/components/button.svelte";
  import halfHero from '$lib/assets/images/halfHero.png'
    import Highlights from "../lib/components/highlights.svelte";
    import Imagegrid from "../lib/components/imagegrid.svelte";
</script>

<section class="relative h-[calc(100vh-53px)] z-[1] w-full flex flex-col justify-center p-5 overflow-hidden">
  <img class="absolute right-0 h-full -z-10" src={halfHero} alt="Hero Seciton">
  <p class="font-semibold text-sm flex items-center">
    <span class="text-primary text-xs">#</span>
    <span>whatwedo</span>
  </p>
  <h1 class="font-semibold text-4xl w-4/5 mb-8">Kreative Holz & Ton Unikate für dein Zuhause!</h1>
  <Button bg="rgb(249,115,22)">
    <div class="flex py-4 px-5 items-center text-white gap-2">
      <i class="fa-solid fa-images"></i>
      <p class="font-semibold">Jetzt durchstöbern</p>
    </div>
  </Button>
</section>



<Imagegrid />