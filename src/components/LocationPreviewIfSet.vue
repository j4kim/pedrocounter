<script setup>
import { computed } from "vue";
import LocationPreview from "./LocationPreview.vue";

const props = defineProps({
  location: String,
});

const latLng = computed(() => {
  if (!props.location) {
    return null;
  }
  const matches = props.location.match(/\d+\.\d+,\d+\.\d+/);
  if (!matches) {
    return null;
  }
  return matches[0];
});
</script>

<template>
  <LocationPreview v-if="latLng" :latLng="latLng" />
</template>
