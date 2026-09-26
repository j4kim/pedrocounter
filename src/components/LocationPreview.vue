<script setup>
import { onMounted, ref, useTemplateRef, watch } from "vue";
import L from "../leaflet";
import { ArrowUpRightIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  latLng: String,
});

const parsedLatLng = ref(null);

let map, marker;

watch(
  props,
  () => {
    parsedLatLng.value = props.latLng.split(",");
    if (marker) {
      marker.setLatLng(parsedLatLng.value);
      map.setView(parsedLatLng.value);
    }
  },
  { immediate: true },
);

const mapEl = useTemplateRef("mapEl");

onMounted(() => {
  map = L.map(mapEl.value, {
    center: parsedLatLng.value,
    zoom: 17,
    zoomControl: false,
    dragging: false,
    boxZoom: false,
    closePopupOnClick: false,
    scrollWheelZoom: false,
    touchZoom: false,
    doubleClickZoom: false,
  });

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  marker = L.marker(parsedLatLng.value).addTo(map);
});
</script>

<template>
  <div class="relative z-0 h-[20svh]">
    <div ref="mapEl" class="h-full w-full rounded bg-lime-200"></div>
    <a
      :href="`https://www.google.com/maps/place/${latLng}`"
      target="_blank"
      class="btn btn-xs absolute top-2 right-2 z-1000"
    >
      <ArrowUpRightIcon class="size-3" />
      Ouvrir
    </a>
  </div>
</template>
