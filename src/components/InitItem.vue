<script setup>
import { XMarkIcon } from "@heroicons/vue/24/solid";
import { deleteItem } from "../db";
import dayjs from "dayjs";
import { debug } from "../debug.js";

const props = defineProps({
  item: Object,
});
</script>

<template>
  <div class="card bg-base-100 flex flex-col gap-2 p-6 shadow">
    <div class="flex items-center gap-2">
      <div class="grow">
        <div class="font-medium">Initialisation</div>
        <div class="text-base-content/50 text-sm">
          le {{ dayjs(item.created_at).format("DD.MM.YYYY HH:mm") }}
        </div>
      </div>
      <div class="font-semibold tabular-nums">{{ item.km }} km</div>
    </div>

    <div v-if="debug">
      <button class="btn btn-sm" @click="deleteItem(item.id)">
        <XMarkIcon class="size-4" /> Supprimer
      </button>
    </div>
  </div>
</template>
