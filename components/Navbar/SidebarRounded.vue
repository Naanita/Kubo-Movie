<script>
import axios from 'axios';

export default {
  name: 'SidebarRounded',
  data() {
    return {
      query: '',
      moviesNow: []
    };
  },
  async created() {
    await this.searchMovies();
  },
  methods: {
    async searchMovies() {
      try {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fd828331f4f9d184851ef546cb39d7fa&query=${this.query}`);
        this.moviesNow = data.results;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    },
    updateQuery(event) {
      this.query = event.target.value;
      this.searchMovies();
    },
    clearQuery() {
      this.query = '';
      this.moviesNow = [];
    },
    redirectToResults() {
      this.$router.push({ name: 'results-matches', query: { name: this.query } });
      this.clearQuery(); 
    }
  }
};
</script>

<template>
  <div class="relative h-full w-full hidden lg:block">
    <div class="absolute top-0 left-0 w-full h-screen">
      <div class="fixed h-full flex flex-col justify-center group ps-10">
        <div class="text-white text-2xl flex items-center my-20">
          <i class="pi pi-search text-2xl me-3"></i>
          <div class=" items-center gap-2 hidden group-hover:flex transition-all duration-300">
            <IconField>
              <InputText 
                placeholder="Search" 
                class="outlineInput" 
                @input="updateQuery"
                @keyup.enter="redirectToResults"
              />
            </IconField>
          </div>
          <div v-if="moviesNow.length" class="relative h-[100px]">
            <ul class="absolute top-0 me-4 w-96 h-96 overflow-auto max-w-md bg-black rounded-lg shadow-lg p-4" style="scrollbar-color: black gray; scrollbar-width: thin;">
              <li v-for="movie in moviesNow" :key="movie.id" class=" border-b border-gray-200 py-2">
                <NuxtLink class="flex" :to="{ name: 'movies-movie', params: { movie: movie.id } }" @click.native="clearQuery">
                  <div class="h-full w-16 me-3">
                    <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"  class="w-full h-full object-contain" alt="">
                  </div>
                  <div>
                    <h1>{{ movie.title }}</h1>
                    <p class="text-gray-500">{{ new Date(movie.release_date).getFullYear() }}</p>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>