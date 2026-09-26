<script setup>
import { ref } from "vue";
import { addItem, lastItem } from "../db";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import LocationPicker from "./LocationPicker.vue";
import { MapIcon } from "@heroicons/vue/24/outline";
import LocationPreviewIfSet from "./LocationPreviewIfSet.vue";
import { debug } from "../debug.js";
import { useStorage } from "@vueuse/core";

const showForm = ref(false);

const showMap = ref(false);

const preferredUser = useStorage("pedrocounter-preferred-user", null);

function newItemDefaults() {
  return {
    km: lastItem.value?.km,
    user: preferredUser.value,
  };
}

function openForm() {
  newItem.value = newItemDefaults();
  showForm.value = true;
}

const newItem = ref(null);

function submit() {
  preferredUser.value = newItem.value.user;
  addItem({
    created_at: Date.now(),
    type: "restitution",
    ...newItem.value,
  });
  showForm.value = false;
}

const users = ref(["Mimi", "Jojo"]);
</script>

<template>
  <form
    v-if="showForm"
    @submit.prevent="submit"
    class="card bg-base-100 shadow"
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
        <select
          class="select w-full appearance-none"
          v-model="newItem.user"
          required
        >
          <option disabled selected>-</option>
          <option v-for="user in users">{{ user }}</option>
        </select>
        <span>Qui a utilisé la voiture ?</span>
      </label>

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

      <div class="join floating-label w-full">
        <input
          placeholder="Localisation"
          class="input join-item w-full grow"
          v-model="newItem.location"
        />
        <button class="btn join-item" @click="showMap = true" type="button">
          <MapIcon class="size-6" />
          Carte
        </button>
        <span>Localisation</span>
      </div>

      <LocationPicker
        v-if="showMap"
        v-model="newItem.location"
        @close="showMap = false"
      />

      <LocationPreviewIfSet :location="newItem.location" />

      <label class="floating-label">
        <textarea
          placeholder="notes"
          class="textarea w-full"
          v-model="newItem.notes"
        ></textarea>
        <span>notes</span>
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

  <button v-else class="btn btn-primary w-full" @click="openForm">
    Rendre
  </button>
</template>
