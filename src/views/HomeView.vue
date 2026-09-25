<script setup>
import Header from "../components/Header.vue";
import Restitute from "../components/Restitute.vue";
import { dbId, deleteItem, itemsArray } from "../db.js";
import { Cog6ToothIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div>
    <Header>
      <a href="/" class="hover:text-primary">pedrocounter</a>
      <div v-if="dbId" class="text-slate-500">({{ dbId }})</div>
      <div class="grow"></div>
      <RouterLink to="/settings" class="hover:text-primary">
        <Cog6ToothIcon class="size-6" />
      </RouterLink>
    </Header>

    <main class="p-4">
      <div>
        <div v-for="[id, item] in itemsArray">
          item {{ id }}: {{ item.km }}
          <button class="btn btn-sm" @click="deleteItem(id)">x</button>
        </div>
      </div>

      <Restitute />
    </main>
  </div>
</template>
