<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { deleteItem } from "../db";
import LocationPreviewIfSet from "./LocationPreviewIfSet.vue";
import dayjs from "dayjs";
import { debug } from "../debug.js";

const props = defineProps({
  item: Object,
  id: String,
});
</script>

<template>
  <div class="card bg-base-100 flex flex-col gap-2 p-6 shadow">
    <div class="flex">
      <div class="grow">
        <span class="font-medium">
          {{ item.user }}
        </span>
        <span class="text-base-content/50">
          le {{ dayjs(item.created_at).format("DD.MM.YYYY HH:mm") }}
        </span>
      </div>
      <div class="font-semibold tabular-nums">TODO km</div>
    </div>

    <div v-if="item.km">
      <div class="text-base-content/50 text-sm">km au compteur</div>
      <div class="tabular-nums">
        {{ item.km }}
      </div>
    </div>

    <div v-if="item.location">
      <div class="text-base-content/50 text-sm">Localisation</div>
      <LocationPreviewIfSet :location="item.location">
        {{ item.location }}
      </LocationPreviewIfSet>
    </div>

    <div v-if="item.notes">
      <div class="text-base-content/50 text-sm">Notes</div>
      <div class="whitespace-pre-line">
        {{ item.notes }}
      </div>
    </div>

    <div v-if="debug">
      <button class="btn btn-sm" @click="deleteItem(id)">
        <XMarkIcon class="size-4" /> Supprimer
      </button>
    </div>
  </div>
</template>
