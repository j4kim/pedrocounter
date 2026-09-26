<script setup>
import { onMounted, useTemplateRef } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { XMarkIcon } from "@heroicons/vue/24/solid";

const model = defineModel({ type: String });

const emit = defineEmits(["close"]);

const mapEl = useTemplateRef("map");

onMounted(() => {
  const map = L.map(mapEl.value).setView(
    [47.09929125386202, 6.8250728417801945],
    16,
  );
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  map.locate({ setView: true, maxZoom: 16 });
});
</script>

<template>
  <div class="fixed top-0 left-0 z-10 h-dvh w-dvw">
    <div ref="map" class="absolute h-full w-full bg-lime-200"></div>
    <div class="absolute z-1000 flex h-full w-full flex-col px-4 py-8">
      <div class="flex justify-end">
        <button
          @click="emit('close')"
          class="btn bg-base-100 btn-circle"
          type="button"
        >
          <XMarkIcon class="size-6" />
        </button>
      </div>
      <div class="grow"></div>
      <button class="btn bg-base-100 w-full" type="button">Sélectionner</button>
    </div>
  </div>
</template>
