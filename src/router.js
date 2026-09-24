import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import SettingsView from "./views/SettingsView.vue";
import InitDbView from "./views/InitDbView.vue";
import { dbId } from "./db.js";

function requireDb() {
  if (!dbId.value) {
    return "/init-db";
  }
}

const routes = [
  { path: "/", component: HomeView, beforeEnter: [requireDb] },
  { path: "/settings", component: SettingsView, beforeEnter: [requireDb] },
  { path: "/init-db", component: InitDbView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
