<script>
  import ph1 from "$lib/assets/images/placeholder/1.jpeg"
	import { sidebarOpen } from '$lib/stores/sidebar.js';
  import "../app.css"
  import logo from '$lib/assets/images/kreativ.png'
  import { fade, fly } from 'svelte/transition';
  import Button from "$lib/components/button.svelte";
  import { Hamburger } from 'svelte-hamburgers';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { imgOpen } from "../lib/stores/imgmodal";

  let imageModal = false
  let open = false;
  let path;
  
  $: path = $page.url.pathname;

  const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const routeTo = async (route) => {
    open = false
    await timeout(600)
    goto(route)
  }

</script>

{#if $imgOpen}
  <div transition:fade class="fixed z-50 w-full h-full bg-[rgba(0,0,0,0.8)] p-5">
    <div class="w-full h-full bg-primary-400 rounded-3xl p-3">
      <div class="flex justify-between items-start h-14">
        <div class="">
          <h1 class="text-lg text-white font-bold">Ton-Kugel mit Blumenmuster</h1>
          <p class="text-xs text-white font-bold">Künstler: Richard Brettschneider</p>
        </div>
        <button on:click={() => imgOpen.set(false)}>
          <i class="fa-solid fa-xmark text-white text-2xl"></i>
        </button>
      </div>
      <div class="bg-white p-1 w-full h-[calc(100%-56px)] rounded-3xl overflow-hidden">
        <img class="w-full rounded-3xl h-full object-cover object-center" src={ph1} alt="">
      </div>
    </div>
  </div>
{/if}
{#if open}
  <div class="mt-[53px] fixed flex justify-end z-50 w-full h-full bg-[rgba(0,0,0,0.8)]" transition:fade={{duration: 250}}>
    <div class="min-w-[280px] w-1/3 h-full bg-slate-50 px-4 py-4" transition:fly={{ x: 250, duration: 500 }}>
      <ul class="[&>li>a]:py-2 [&>li>a]:block [&>li>a]:font-semibold [&>li>a]:ml-2 [&>li>a]:transition-all">
        <li>
          <p class="font-semibold text-sm flex items-center mt-3 mb-1">
            <span class="text-primary text-xs">#</span>
            <span>bilder</span>
          </p>
        </li>
        <li><a href="#" on:click={() => routeTo("/")} class={path === '/' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-images"></i> Übersicht</a></li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-images"></i> Ton Produkte</a></li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-images"></i> Holz Produkte</a></li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-images"></i> Textil Produkte</a></li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-images"></i> Sonstiges</a></li>
        <li>
          <p class="font-semibold text-sm flex items-center mt-3 mb-1">
            <span class="text-primary text-xs">#</span>
            <span>sonstiges</span>
          </p>
        </li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-users"></i> Wer sind wir?</a></li>
        <li><a href="#" on:click={() => routeTo("/about")} class={path === '/about' ? 'text-primary' : 'hover:text-primary'}><i class="fa-solid fa-gavel"></i> Impressum</a></li>
      </ul>
    </div>
  </div>
{/if}
<div class="fixed w-full z-10 bg-white border-b-[1px] border-primary-700 flex justify-between items-center px-3">
  <a href="/" class="h-full py-3">
    <img class="h-7" src={logo} alt="">
  </a>
  <div class="flex items-center gap-4">
    <div class="flex gap-2">
      <a href="https://www.facebook.com/KreativWerkstattMeiningen/" target="_blank" rel="noreferrer"><i class="text-sm fa-brands fa-facebook hover:text-orange-500 transition"></i></a>
      <a href="https://www.instagram.com/kreativ.werkstatt.meiningen/" target="_blank" rel="noreferrer"><i class="text-sm fa-brands fa-instagram hover:text-orange-500 transition"></i></a>
      <a href="https://www.tiktok.com/@kreativwerkstatt.mgn" target="_blank" rel="noreferrer"><i class="text-sm fa-brands fa-tiktok hover:text-orange-500 transition"></i></a>
    </div>
    <Button >
      <Hamburger bind:open type="slider-r" --layer-spacing="2px" --active-color="rgb(249,115,22)" --layer-width="13px" --color="#333333" --layer-height="2px" --padding="8px 5px" />
    </Button>
  </div>
</div>
<div class="pt-[53px]">
  <slot />
</div>

<style>
  :global(.hamburger-inner::before) {
    left: 2px;
  }
</style>