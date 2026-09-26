<script setup>
import { deleteItem } from "../db";

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
    <div>
      <button class="btn btn-sm" @click="deleteItem(id)">x</button>
    </div>
  </div>
</template>
