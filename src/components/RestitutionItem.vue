<script setup>
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/vue/24/solid";
import { deleteItem } from "../db";
import LocationPreviewIfSet from "./LocationPreviewIfSet.vue";
import dayjs from "dayjs";
import { debug } from "../debug.js";
import { ref } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  item: Object,
});

const open = ref(false);
</script>

<template>
  <div class="card bg-base-100 flex flex-col gap-2 p-6 shadow">
    <div class="flex items-center gap-2">
      <div class="grow">
        <div class="font-medium">
          {{ item.user }}
        </div>
        <div class="text-base-content/50 text-sm">
          le {{ dayjs(item.created_at).format("DD.MM.YYYY HH:mm") }}
        </div>
      </div>
      <MapPinIcon v-if="item.location" class="size-4" />
      <InformationCircleIcon v-if="item.notes" class="size-4" />
      <div class="font-semibold tabular-nums">{{ item.delta }} km</div>
      <button class="btn btn-circle btn-ghost" @click.stop="open = !open">
        <ChevronUpIcon class="size-4" v-if="open" />
        <ChevronDownIcon class="size-4" v-else />
      </button>
    </div>

    <template v-if="open">
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
        <button class="btn btn-sm" @click="deleteItem(item.id)">
          <XMarkIcon class="size-4" /> Supprimer
        </button>
      </div>
    </template>
  </div>
</template>
