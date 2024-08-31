<script>
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import axios from "axios";
import CardSimple from "~/components/Cards/SimpleCard.vue";
import Breadcrumb from 'primevue/breadcrumb';

export default { 
  components: { CardSimple, Breadcrumb },
  data() {
    return {
      query: '',
      moviesNow: [],
      home: { icon: 'pi pi-home', url: '/' },
      items: []
    };
  },
  async created() {
    const route = useRoute();
    this.query = route.query.name || '';
    this.updateBreadcrumbs();
    await this.fetchMovies();

    watch(route, async (newRoute) => {
      this.query = newRoute.query.name || '';
      this.updateBreadcrumbs();
      await this.fetchMovies();
    });
  },
  methods: {
    async fetchMovies() {
      if (this.query) {
        try {
          const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=fd828331f4f9d184851ef546cb39d7fa&query=${this.query}`);
          this.moviesNow = data.results;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      } else {
        this.moviesNow = [];
      }
    },
    updateBreadcrumbs() {
      this.items = [
        { label: `Movies matching "${this.query}"` } 
      ];
    }
  }
}
</script>

<template>
  <div class="container mx-auto mt-8 min-h-screen">
    <h1 class="text-white text-5xl mt-40 lg:mt-0">Movies that match "{{ query }}"</h1>
    <div class="card flex bg-transparent">
      <Breadcrumb class="bg-transparent" :home="home" :model="items" />
    </div>
    <div class="grid grid-cols-12 gap-4 my-4 p-4">
      <div v-if="moviesNow.length === 0" class="col-span-12 text-center text-white">
        <h1 class="text-white text-7xl mt-40">There are no films to show that match the name: {{ query }}</h1>
      </div>
      <div v-else v-for="(movie, index) in moviesNow.slice(1)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
        <CardSimple :movie="movie" />
      </div>
    </div>
  </div>
</template>