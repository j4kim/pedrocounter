<script setup>
import { ref } from "vue";
import { addItem } from "../db";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const showForm = ref(true);
</script>

<template>
  <form v-if="showForm" class="card bg-base-200 shadow">
    <div class="card-body relative gap-4">
      <h2 class="card-title justify-between">
        Rendre Pedro

        <button
          @click="showForm = false"
          class="btn btn-ghost btn-circle btn-sm"
        >
          <XMarkIcon class="size-6" />
        </button>
      </h2>

      <label class="floating-label">
        <input
          placeholder="Qui a utilisé la voiture ?"
          class="input w-full"
          required
        />
        <span>Qui a utilisé la voiture ?</span>
      </label>

      <label class="floating-label">
        <input placeholder="km" class="input w-full" type="number" required />
        <span>km</span>
      </label>

      <label class="floating-label">
        <input placeholder="Localisation" class="input w-full" type="number" />
        <span>Localisation</span>
      </label>

      <label class="floating-label">
        <textarea placeholder="notes" class="textarea w-full"></textarea>
        <span>notes</span>
      </label>

      <div class="card-actions">
        <button class="btn btn-primary w-full">Valider</button>
      </div>
    </div>
  </form>

  <button v-else class="btn w-full" @click="showForm = true">Rendre</button>
</template>
