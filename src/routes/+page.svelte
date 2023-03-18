<script>
  import Button from "../lib/components/button.svelte";
  import halfHero from '$lib/assets/images/halfHero.png'
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

<section class="bg-orange-100">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    <p class="font-semibold text-sm flex items-center">
      <span class="text-primary text-xs">#</span>
      <span>highlights</span>
    </p>
  </div>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
  <p>lorem</p>
</section>