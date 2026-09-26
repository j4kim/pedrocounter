<script setup>
import { ref } from "vue";
import { addItem, lastItem } from "../db";
import { XMarkIcon } from "@heroicons/vue/24/solid";
import LocationPicker from "./LocationPicker.vue";
import { MapIcon } from "@heroicons/vue/24/outline";
import LocationPreviewIfSet from "./LocationPreviewIfSet.vue";

const showForm = ref(false);

const showMap = ref(false);

const newItem = ref({
  km: lastItem.value?.km,
});

function submit() {
  addItem({
    ...newItem.value,
    created_at: Date.now(),
    type: "restitution",
  });
  newItem.value = {
    km: newItem.value.km,
  };
}

const users = ref(["Mimi", "Jojo"]);
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

      <div>
        <label>Qui a utilisé la voiture ?</label>
        <input
          v-for="user in users"
          type="radio"
          name="user"
          class="w-px opacity-0"
          v-model="newItem.user"
          :value="user"
          required
          :id="`user-${user}`"
        />
        <div class="mt-1 flex flex-wrap gap-2">
          <label
            class="btn grow"
            v-for="user in users"
            :for="`user-${user}`"
            :class="{
              'btn-soft btn-primary pointer-events-none': newItem.user === user,
            }"
          >
            {{ user }}
          </label>
        </div>
      </div>

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

      <div class="join w-full">
        <label class="floating-label join-item grow">
          <input
            placeholder="Localisation"
            class="input w-full"
            v-model="newItem.location"
          />
          <span>Localisation</span>
        </label>
        <button
          class="btn bg-base-100 join-item"
          @click="showMap = true"
          type="button"
        >
          <MapIcon class="size-6" />
          Carte
        </button>
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

      <div class="card-actions">
        <button class="btn btn-primary w-full">Valider</button>
      </div>
    </div>
  </form>

  <button v-else class="btn w-full" @click="showForm = true">Rendre</button>
</template>
