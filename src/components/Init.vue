<script setup>
import { ref } from "vue";
import { addItem } from "../db";
import { debug } from "../debug";

const newItem = ref({});

function submit() {
  addItem({
    ...newItem.value,
    created_at: Date.now(),
    type: "init",
  });
  newItem.value = {};
}
</script>

<template>
  <form @submit.prevent="submit" class="card bg-base-100 shadow">
    <div class="card-body relative gap-4">
      <h2 class="card-title justify-between">Initialisation</h2>

      <label class="floating-label">
        <input
          placeholder="km au compteur"
          class="input w-full"
          type="number"
          required
          v-model="newItem.km"
        />
        <span>km au compteur</span>
      </label>

      <label class="floating-label" v-if="debug">
        <input
          placeholder="date et heure"
          class="input w-full"
          type="datetime-local"
          v-model="newItem.created_at"
        />
        <span>date et heure</span>
      </label>

      <div class="card-actions">
        <button class="btn btn-primary w-full">Valider</button>
      </div>
    </div>
  </form>
</template>
