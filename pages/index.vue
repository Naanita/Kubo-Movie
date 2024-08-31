<script>
import axios from 'axios';
import Bigcard from '../components/Cards/Bigcard.vue';
import CardSimple from "~/components/Cards/SimpleCard.vue";
import Button from 'primevue/button';



export default {
  components: { Bigcard, CardSimple, Button },
  data() {
    return {
      moviesNow: [],
      moviespopular: [],
      moviesTop: [],
      moviesUpcoming: [],
      responsiveOptions: [
        {
          breakpoint: '1400px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '1199px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
        },
        {
          breakpoint: '575px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  async created() {
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=fd828331f4f9d184851ef546cb39d7fa');
      this.moviesNow = data.results;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=fd828331f4f9d184851ef546cb39d7fa');
      this.moviespopular = data.results;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=fd828331f4f9d184851ef546cb39d7fa');
      this.moviesTop = data.results;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
    try {
      const { data } = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=fd828331f4f9d184851ef546cb39d7fa');
      this.moviesUpcoming = data.results;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }

  }
}
</script>

<template>
  <div>
    <Bigcard :movie="moviesNow[0]" v-if="moviesNow.length > 0" />
    <div class="h-screen relative">View All</div>
    <div class="relative z-50">
      <div class="container mx-auto mt-8">
        <div class="my-20">
          <h1 class="text-white text-5xl">movies on the Billboard</h1>
          <div class="grid grid-cols-12 gap-4 my-4 p-4">
            <div v-for="(movie, index) in moviesNow.slice(1,9)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
              <CardSimple :movie="movie" />
            </div>
          </div>
        </div>
        <div class="my-20">
          <h1 class="text-white text-5xl">Popular Movies</h1>
          <div class="grid grid-cols-12 gap-4 my-4 p-4">
            <div v-for="(movie, index) in moviespopular.slice(0,8)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
              <CardSimple :movie="movie" />
            </div>
          </div>
        </div>
        <div class="my-20">
          <h1 class="text-white text-5xl">Top Movies</h1>
          <div class="grid grid-cols-12 gap-4 my-4 p-4">
            <div v-for="(movie, index) in moviesTop.slice(0,8)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
              <CardSimple :movie="movie" />
            </div>
          </div>
        </div>
        <div class="my-20">
          <h1 class="text-white text-5xl">Upcoming Movies</h1>
          <div class="grid grid-cols-12 gap-4 my-4 p-4">
            <div v-for="(movie, index) in moviesUpcoming.slice(0,8)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
              <CardSimple :movie="movie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
