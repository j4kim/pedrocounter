<script setup>
import { dbId } from "../db.js";
import { Cog6ToothIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div>
    <header
      class="flex h-12 items-center justify-between gap-4 p-2 px-4 shadow"
    >
      <a href="/">pedrocounter</a>
      <div v-if="dbId" class="text-slate-500">({{ dbId }})</div>
      <div class="grow"></div>
      <RouterLink to="/settings">
        <Cog6ToothIcon class="link size-6" />
      </RouterLink>
    </header>
  </div>
</template>
