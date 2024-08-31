<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
        <div class="max-w-md p-8 bg-white rounded shadow">
            <h1 class="text-4xl font-bold mb-4">Oops!</h1>
            <p class="text-lg mb-4">It looks like something went wrong.</p>
            <p class="text-lg mb-4">Sorry about that.</p>
            <p class="text-sm text-gray-500">Error message: <strong>{{ error.message }}</strong></p>
            <button class="bg-black text-white font-bold py-2 px-4 rounded mt-5" @click="goToHome">Go to Home</button>
        </div>
    </div>
</template>

<script setup>
import { useError } from '#imports';
import { useRouter } from 'vue-router';

const error = useError();
const router = useRouter();

const goToHome = () => {
  router.push('/');
};
</script>

