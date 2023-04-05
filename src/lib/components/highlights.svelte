<script>
  import ph1 from "$lib/assets/images/placeholder/1.jpeg"
  import ph2 from "$lib/assets/images/placeholder/2.jpeg"
  import ph3 from "$lib/assets/images/placeholder/3.jpeg"
  import ph4 from "$lib/assets/images/placeholder/4.jpeg"
  import ph5 from "$lib/assets/images/placeholder/5.jpeg"
  import ph6 from "$lib/assets/images/placeholder/6.jpeg"
</script>

<section class="bg-orange-100">
  <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    <p class="font-semibold text-sm flex items-center">
      <span class="text-primary text-xs">#</span>
      <span>highlights</span>
    </p>
  </div>
  <div class="flex items-center relative">
    <div class="absolute left-2 bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
      <i class="fa-solid fa-angle-left"></i>
    </div>
    <div class="flex justify-center items-center w-full overflow-hidden ">
      <div class="min-w-[280px] h-[200px]">
        <img class="object-cover w-full h-full" src={ph1} alt="">
      </div>
      <div class="min-w-[250px] h-[220px] m-2">
        <img class="object-cover w-full h-full shadow-xl" src={ph2} alt="">
      </div>
      <div class="min-w-[280px] h-[200px]">
        <img class="object-cover w-full h-full" src={ph3} alt="">
      </div>
    </div>
    <div class="absolute right-2 bg-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer">
      <i class="fa-solid fa-angle-right"></i>
    </div>
  </div>
</section>