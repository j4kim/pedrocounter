<script setup>
import { ref } from "vue";
import { dbId } from "../db";

const newDbId = ref(null);

function connect() {
  dbId.value = newDbId.value;
}
</script>

<template>
  <main class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">pedrocounter</h1>
        <p class="py-6">
          Premièrement, entrez le nom d'une base de données.<br />Si elle
          n'exite pas encore, une nouvelle base de données sera initialisée.
        </p>
        <form class="join" @submit.prevent="connect">
          <input
            class="input join-item"
            placeholder="Base de données"
            required
            v-model="newDbId"
          />
          <button class="btn join-item">Connecter</button>
        </form>
      </div>
    </div>
  </main>
</template>
