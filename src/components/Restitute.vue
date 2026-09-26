<script setup>
import { ref } from "vue";
import { addItem } from "../db";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const showForm = ref(true);

const newItem = ref({});

function submit() {
  addItem({
    ...newItem.value,
    created_at: Date.now(),
    type: "restitution",
  });
  newItem.value = {};
}
</script>

<template>
  <form
    v-if="showForm"
    @submit.prevent="submit"
    class="card bg-base-200 shadow"
  >
    <div class="card-body relative gap-4">
      <h2 class="card-title justify-between">
        Rendre Pedro

        <button
          @click="showForm = false"
          class="btn btn-ghost btn-circle btn-sm"
          type="button"
        >
          <XMarkIcon class="size-6" />
        </button>
      </h2>

      <label class="floating-label">
        <input
          placeholder="Qui a utilisé la voiture ?"
          class="input w-full"
          required
          v-model="newItem.user"
        />
        <span>Qui a utilisé la voiture ?</span>
      </label>

      <label class="floating-label">
        <input
          placeholder="km"
          class="input w-full"
          type="number"
          required
          v-model="newItem.km"
        />
        <span>km</span>
      </label>

      <label class="floating-label">
        <input
          placeholder="Localisation"
          class="input w-full"
          v-model="newItem.location"
        />
        <span>Localisation</span>
      </label>

      <label class="floating-label">
        <textarea
          placeholder="notes"
          class="textarea w-full"
          v-model="newItem.notes"
        ></textarea>
        <span>notes</span>
      </label>

      <div class="card-actions">
        <button class="btn btn-primary w-full">Valider</button>
      </div>
    </div>
  </form>

  <button v-else class="btn w-full" @click="showForm = true">Rendre</button>
</template>
