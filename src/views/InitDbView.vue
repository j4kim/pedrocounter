<script setup>
import { ref } from "vue";
import { dbId } from "../db";
import Header from "../components/Header.vue";
import HomeLink from "../components/HomeLink.vue";

const newDbId = ref(null);

function connect() {
  dbId.value = newDbId.value;
}

function disconnect() {
  dbId.value = null;
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header v-if="dbId">
      <HomeLink />
      Base de données
      <div class="grow"></div>
    </Header>

    <main class="hero grow">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-5xl font-bold">pedrocounter</h1>
          <div v-if="dbId">
            <p class="py-6">
              Vous êtes connecté à la base de données
              <strong>{{ dbId }}</strong
              >.
            </p>
            <button class="btn" @click="disconnect">Déconnecter</button>
          </div>
          <div v-else>
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
      </div>
    </main>
  </div>
</template>
