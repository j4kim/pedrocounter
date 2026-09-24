<script setup>
import { ArrowLeftIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import { connectToDb, dbId, disconnectFromDb } from "../db.js";
</script>

<template>
  <div>
    <header class="flex h-12 items-center gap-4 p-2 px-4 shadow">
      <RouterLink to="/">
        <ArrowLeftIcon class="size-6" />
      </RouterLink>
      Réglages
    </header>

    <div class="flex grow flex-col gap-12 p-6">
      <div>
        <div class="mb-2">Base de données</div>
        <div v-if="dbId" class="flex items-center gap-4">
          {{ dbId }}
          <button class="red-btn" @click="disconnectFromDb">
            <XMarkIcon class="inline size-5" />
            <span class="hidden sm:inline">Déconnecter</span>
          </button>
        </div>
        <button class="btn" @click="connectToDb" v-else>Connecter</button>
      </div>
    </div>
  </div>
</template>
