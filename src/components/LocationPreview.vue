<script setup>
import { computed, onMounted, useTemplateRef } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  latLng: String,
});

const parsedLatLng = computed(() => props.latLng.split(","));

const mapEl = useTemplateRef("mapEl");

let map;

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

  const marker = L.marker(parsedLatLng.value).addTo(map);
});
</script>

<template>
  <div ref="mapEl" class="z-0 h-[20svh] w-full rounded bg-lime-200"></div>
</template>
