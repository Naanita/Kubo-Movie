<script>
import { useRoute } from "vue-router";
import axios from "axios";
import BigcardMoreInfo from "~/components/Cards/BigcardMoreInfo.vue";
import CardSimple from "~/components/Cards/SimpleCard.vue";
import Breadcrumb from 'primevue/breadcrumb';

export default {
    components: { BigcardMoreInfo, CardSimple, Breadcrumb },
    data() {
        return {
            movieDetail: null,
            movieRecomendations: [],
            home: { icon: 'pi pi-home', url: '/' },
            items: []
        };
    },
    async created() {
        const route = useRoute();
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${route.params.movie}?api_key=fd828331f4f9d184851ef546cb39d7fa`
            );
            this.movieDetail = data;
            this.updateBreadcrumbs();
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/movie/${route.params.movie}/recommendations?api_key=fd828331f4f9d184851ef546cb39d7fa`
            );
            console.log("Datos obtenidos:", data);
            this.movieRecomendations = data.results;
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    },
    methods: {
        updateBreadcrumbs() {
            if (this.movieDetail) {
                this.items = [
                    { label: this.movieDetail.title }
                ];
            }
        }
    }
};
</script>

<template>
    <div>
        <BigcardMoreInfo :movie="movieDetail" v-if="movieDetail" />
        <div class="container mx-auto mt-8 min-h-screen">
            <h1 class="text-white text-5xl">Recommended</h1>
            <div class="card flex bg-transparent">
                <Breadcrumb class="bg-transparent" :home="home" :model="items" />
            </div>
            <div class="grid grid-cols-12 gap-4 my-4 p-4">
                <div v-for="(movie, index) in movieRecomendations.slice(0, 8)" :key="index" class="col-span-12 md:col-span-4 lg:col-span-3">
                    <CardSimple :movie="movie" />
                </div>
            </div>
        </div>
    </div>
</template>