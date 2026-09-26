<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { connectToDb, dbId, disconnectFromDb } from "../db.js";
import HomeLink from "../components/HomeLink.vue";
import Header from "../components/Header.vue";
import { debug } from "../debug.js";
</script>

<template>
  <div>
    <Header>
      <HomeLink />
      Réglages
      <div class="grow"></div>
    </Header>

    <main class="flex grow flex-col gap-12 p-6">
      <div>
        <div class="mb-2">Base de données</div>
        <div v-if="dbId" class="flex items-center gap-4">
          {{ dbId }}
          <button class="btn btn-error btn-sm" @click="disconnectFromDb">
            <XMarkIcon class="inline size-5" />
            <span class="hidden sm:inline">Déconnecter</span>
          </button>
        </div>
      </div>

      <label class="label">
        <input type="checkbox" v-model="debug" class="toggle" />
        Debug
      </label>
    </main>
  </div>
</template>
