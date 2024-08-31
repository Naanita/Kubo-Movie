<template>
  <div class="relative">
    <div :style="backgroundImageStyle" class="relative top-0 left-0 h-[30vh] md:h-[90vh] bg-cover bg-center bg-no-repeat">
      <div class="w-full h-full bg-black-75 z-1 flex flex-col justify-center">
        <div class="p-5 grid-cols-12 gap-4  hidden md:grid lg:grid">
          <div class="col-span-8 flex flex-col justify-center">
            <h1 class="text-white text-5xl md:text-6xl lg:text-8xl">{{ movie.original_title }}</h1>
            <div class="flex justify-between flex-wrap text-white text-2xl my-3 w-3/5">
              <p class=" text-gray-500">{{ movie.runtime }} min</p>
              <p class=" text-gray-500">{{ new Date(movie.release_date).getFullYear() }}</p>
              <p class="text-white text-2xl">{{ movie.genres.map(genre => genre.name).join(' · ') }}</p>
            </div>
            <p class="text-white text-2xl w-4/5">{{ movie.overview }}</p>
            <div class="flex flex-wrap items-center text-1xl mt-4">
              <i class="pi pi-star-fill text-red-N me-2"></i>
              <p class="text-white text-2xl">{{ formatVoteAverage(movie.vote_average) }} / 10</p>
            </div>
            <div class="flex flex-wrap items-center mt-4">
              <a target="_blank" :href="movie.homepage"
                class="group relative inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-black hover:bg-black hover:text-white transition-all duration-300">
                <span class="text-2xl">More Info</span>
                <div class="relative ml-1 h-5 w-5 overflow-hidden">
                  <div
                    class="absolute transition-all duration-200 group-hover:-translate-y-6 group-hover:translate-x-4">
                    <i class="pi pi-arrow-up-right h-5 w-5"></i>
                    <i class="pi pi-arrow-up-right h-5 w-5 -translate-x-4"></i>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div class="col-span-3">
            <div class="h-full flex justify-center items-center">
              <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
                alt="Poster de {{ movie.original_title }}" class="w-full h-100 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my-10 block md:hidden lg:hidden">
      <div class="h-full flex flex-col justify-center  w-[80%] mx-auto">
        <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="Poster de {{ movie.original_title }}" class="w-full h-100 object-contain" />
        <div class="mt-5">
          <h1 class="text-white text-4xl text-start">{{ movie.original_title }}</h1>
          <div class="flex justify-between flex-wrap text-white text-2xl my-3 w-4/5">
            <p class=" text-gray-500">{{ movie.runtime }} min</p>
            <p class=" text-gray-500">{{ new Date(movie.release_date).getFullYear() }}</p>
            <p class="text-white text-2xl">{{ movie.genres.map(genre => genre.name).join(' · ') }}</p>
          </div>
          <p class="text-white">{{ movie.overview }}</p>
          <div class="flex flex-wrap items-center text-1xl mt-4">
            <i class="pi pi-star-fill text-red-N me-2"></i>
            <p class="text-white">{{ formatVoteAverage(movie.vote_average) }} / 10</p>
          </div>
          <div class="flex flex-wrap items-center mt-4">
            <a target="_blank" :href="movie.homepage"
              class="group relative inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-black hover:bg-black hover:text-white transition-all duration-300">
              <span class="text-2xl">More Info</span>
              <div class="relative ml-1 h-5 w-5 overflow-hidden">
                <div class="absolute transition-all duration-200 group-hover:-translate-y-6 group-hover:translate-x-4">
                  <i class="pi pi-arrow-up-right h-5 w-5"></i>
                  <i class="pi pi-arrow-up-right h-5 w-5 -translate-x-4"></i>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
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
  }
};
</script>