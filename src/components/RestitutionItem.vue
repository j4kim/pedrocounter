<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { deleteItem } from "../db";

const dev = import.meta.env.DEV;

const props = defineProps({
  item: Object,
  id: String,
});
</script>

<template>
  <div class="card bg-base-200 p-6 shadow">
    <div>{{ item.created_at }}</div>
    <div>{{ item.user }}</div>
    <div>{{ item.km }} km</div>
    <div>{{ item.location }}</div>
    <div>{{ item.notes }}</div>
    <div v-if="dev">
      <button class="btn btn-sm" @click="deleteItem(id)">
        <XMarkIcon class="size-4" /> Supprimer
      </button>
    </div>
  </div>
</template>
