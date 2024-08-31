<template>
  <div class="container-fluid bg-gray-black">
    <div class="flex overflow-x-hidden">
      <Navbar />
      <div class="relative flex-none hidden lg:block w-[6%] hover:w-3/12 bg-gradient-to-r  from-transparent  hover:from-black from-15% to-transparent z-[900] transition-all duration-300">
           <SidebarRounded />
       </div>
       <div class="relative flex-grow w-auto transition-all duration-300">
           <slot></slot>
       </div>
    </div>
  </div>
</template>

<script>
import SidebarRounded from '~/components/Navbar/SidebarRounded.vue'
import Navbar from '~/components/Navbar/Navbar.vue';
export default {
  components: {
    SidebarRounded,
    Navbar

  }
};
</script>