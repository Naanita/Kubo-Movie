<template>
    <NuxtLink :to="{ name: 'movies-movie', params: { movie: movie.id } }" class="relative card rounded overflow-hidden">
        <img :src="`https://image.tmdb.org/t/p/original${this.movie.poster_path}`" class="w-full h-full aspect-auto"
            alt="">
        <div class="gradientBgOnHover group overflow-hidden">
            <div class="absolute m-3 bottom-0 lg:translate-y-16 opacity-1 lg:opacity-0  group-hover:translate-y-0  group-hover:opacity-100 transition-all duration-300">
                <h1 class="text-gray-500">{{ new Date(movie.release_date).getFullYear() }}</h1>
                <h1 class="text-white text-5xl">{{ movie.title }}</h1>
            </div>
        </div>
    </NuxtLink>
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
                backgroundImage: `url('https://image.tmdb.org/t/p/original${this.movie.poster_path}')`
            };
        }
    },
}
</script>