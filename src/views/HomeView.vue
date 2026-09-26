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

    <main class="mx-auto flex max-w-3xl flex-col gap-4 p-4">
      <div class="card bg-base-200 p-5 shadow" v-for="[id, item] in itemsArray">
        <div>{{ item.created_at }}</div>
        <div>{{ item.user }}</div>
        <div>{{ item.km }} km</div>
        <div>{{ item.location }}</div>
        <div>{{ item.notes }}</div>
        <div>
          <button class="btn btn-sm" @click="deleteItem(id)">x</button>
        </div>
      </div>

      <Restitute />
    </main>
  </div>
</template>
