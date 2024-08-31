<template>
  <div ref="animatedElement" :style="backgroundImageStyle" class="fixed top-0 left-0 h-screen w-screen bg-cover bg-center bg-no-repeat z-10">
    <div class="w-full h-full bg-black-75 z-1 flex flex-col justify-center">
      <div class="p-5  lg:ps-40">
        <h1 class="text-white text-5xl md:text-6xl lg:text-8xl mb-3">{{ movie.title }}</h1>
        <p class="text-white text-2xl lg:w-3/6">{{ movie.overview }}</p>
        <div class="flex flex-wrap items-center text-1xl mt-4">
          <i class="pi pi-star-fill text-red-N me-2"></i>
          <p class="text-white">{{ formatVoteAverage(movie.vote_average) }} / 10</p>
        </div>
        <div class="flex flex-wrap items-center mt-4">
          <NuxtLink :to="{ name: 'movies-movie', params: { movie: movie.id } }" class="group relative inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-black hover:bg-black hover:text-white transition-all duration-300">
            <span class="text-2xl">More Info</span>
            <div class="relative ml-1 h-5 w-5 overflow-hidden">
              <div class="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                <i class="pi pi-arrow-up-right h-5 w-5"></i>
                <i class="pi pi-arrow-up-right h-5 w-5 -translate-x-4"></i>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    backgroundImageStyle() {
      return {
        backgroundImage: `url('https://image.tmdb.org/t/p/original${this.movie.backdrop_path}')`
      };
    }
  },
  methods: {
    formatVoteAverage(vote) {
      return Math.floor(vote * 10) / 10;
    }
  },
  mounted() {

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.$refs.animatedElement,
        start: "top top",
        end: "bottom 40%",
        scrub: 1,
      }
    });

    tl.fromTo(this.$refs.animatedElement,
      {opacity:1},
      { opacity: 0, duration: 0.5 }
    );
  }
};
</script>