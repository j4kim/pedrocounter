<script setup>
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid";
import {
  connectToDb,
  dbId,
  disconnectFromDb,
  settings,
  settingsNode,
} from "../db.js";
import HomeLink from "../components/HomeLink.vue";
import Header from "../components/Header.vue";
import { debug } from "../debug.js";

function addUser() {
  const name = prompt("Nom");
  if (!name) {
    return;
  }
  settings.value.users.push(name);
}

function removeUser(index) {
  settings.value.users.splice(index, 1);
}
</script>

<template>
  <div>
    <Header>
      <HomeLink />
      Réglages
      <div class="grow"></div>
    </Header>

    <main class="flex grow flex-col gap-12 p-6">
      <div>
        <div class="mb-2">Base de données</div>
        <div v-if="dbId" class="flex items-center gap-4">
          {{ dbId }}
          <button class="btn btn-error btn-sm" @click="disconnectFromDb">
            <XMarkIcon class="inline size-5" />
            <span class="hidden sm:inline">Déconnecter</span>
          </button>
        </div>
      </div>

      <div>
        <div class="mb-2">Utilisateurices</div>
        <ul>
          <li v-for="(user, index) in settings.users">
            {{ user }}
            <button class="btn btn-circle btn-sm" @click="removeUser(index)">
              <XMarkIcon class="size-5"></XMarkIcon>
            </button>
          </li>
        </ul>
        <button class="btn btn-sm" @click="addUser">
          <PlusIcon class="size-5" />
          Ajouter
        </button>
      </div>

      <label class="label">
        <input type="checkbox" v-model="debug" class="toggle" />
        Debug
      </label>
    </main>
  </div>
</template>
