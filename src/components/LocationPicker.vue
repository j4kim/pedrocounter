<script setup>
import { onMounted, useTemplateRef } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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
});
</script>

<template>
  <div ref="map" class="h-[50svh]"></div>
</template>
