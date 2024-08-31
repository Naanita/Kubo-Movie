<template>
  <div class="card fixed w-full z-[900] block lg:hidden">
    <Menubar class="rounded-none  " style="border-radius: 0px; background: #000; border: 0px;">
      <template #start>
        <a href="/">
          <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
            <path
              d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
              fill="var(--p-primary-color)"
            />
            <path
              d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
              fill="var(--p-text-color)"
            />
          </svg>
        </a>
      </template>
      <template #end>
        <div class="text-white text-2xl flex items-center relative">
          <div class="items-center gap-2 block group-hover:flex transition-all duration-300">
            <IconField>
              <InputText 
                placeholder="Search" 
                class="outlineInput" 
                @input="updateQuery"
                @keyup.enter="redirectToResults"
              />
            </IconField>
          </div>
          <div v-if="moviesNow.length" class="absolute top-full left-[10%] translate-x-[-50%]">
            <ul class=" w-80 h-96 overflow-auto max-w-md bg-black rounded-lg shadow-lg p-4" style="scrollbar-color: black gray; scrollbar-width: thin;">
              <li v-for="movie in moviesNow" :key="movie.id" class="border-b border-gray-200 py-2">
                <NuxtLink class="flex" :to="{ name: 'movies-movie', params: { movie: movie.id } }" @click.native="clearQuery">
                  <div class="h-full w-16 me-3">
                    <img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" class="w-full h-full object-contain" alt="">
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
      </template>
    </Menubar>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Navbar',
  data() {
    return {
      query: '',
      moviesNow: []
    };
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