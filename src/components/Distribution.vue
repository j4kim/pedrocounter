<script setup>
import { deltaSum, deltaSumByUser } from "../db";

const userColors = {};

let bgColors = [
  "bg-accent",
  "bg-primary",
  "bg-secondary",
  "bg-cyan-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-lime-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-fuchsia-500",
  "bg-amber-500",
];

let i = 0;

function getColorClass(user) {
  if (!userColors[user]) {
    const color = bgColors[i % bgColors.length];
    i++;
    userColors[user] = color;
  }
  return userColors[user];
}
</script>

<template>
  <div class="flex flex-col gap-2" v-if="deltaSum">
    <h2 class="font-semibold">Répartition</h2>
    <div class="bg-base-300 flex h-2 overflow-hidden rounded">
      <div
        v-for="(km, user) in deltaSumByUser"
        :class="getColorClass(user)"
        :style="{
          width: `${(100 * km) / deltaSum}%`,
        }"
      ></div>
    </div>
    <div class="flex flex-wrap gap-x-6">
      <div
        v-for="(km, user) in deltaSumByUser"
        class="flex flex-wrap items-center gap-2"
      >
        <div
          class="size-2 shrink-0 rounded-full"
          :class="getColorClass(user)"
        ></div>
        {{ user }}: {{ km }} km ({{ Math.round((100 * km) / deltaSum) }}%)
      </div>
    </div>
  </div>
</template>
