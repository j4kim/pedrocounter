<script setup>
import Distribution from "../components/Distribution.vue";
import Header from "../components/Header.vue";
import Init from "../components/Init.vue";
import InitItem from "../components/InitItem.vue";
import Restitute from "../components/Restitute.vue";
import RestitutionItem from "../components/RestitutionItem.vue";
import { dbId, displayedItems, itemsArray, pagedItemsArray } from "../db.js";
import { Cog6ToothIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <div class="flex h-dvh flex-col">
    <Header>
      <a href="/" class="hover:text-primary">pedrocounter</a>
      <div v-if="dbId" class="text-slate-500">({{ dbId }})</div>
      <div class="grow"></div>
      <RouterLink to="/settings" class="hover:text-primary">
        <Cog6ToothIcon class="size-6" />
      </RouterLink>
    </Header>

    <main class="w-full overflow-auto">
      <div class="mx-auto flex max-w-3xl flex-col gap-4 p-4">
        <button
          class="btn"
          v-if="pagedItemsArray.length < itemsArray.length"
          @click="displayedItems += 10"
        >
          Voir les entrées précédentes
        </button>

        <template v-for="item in pagedItemsArray">
          <RestitutionItem
            v-if="item.type === 'restitution'"
            :item
          ></RestitutionItem>
          <InitItem v-else-if="item.type === 'init'" :item></InitItem>
          <div v-else class="font-mono wrap-break-word whitespace-pre">
            {{ JSON.stringify(item, null, 2) }}
          </div>
        </template>

        <Restitute v-if="itemsArray.length" />
        <Init v-else />

        <Distribution class="pt-[40svh] pb-4" />
      </div>
    </main>
  </div>
</template>
