import { createRouter, createWebHistory } from "vue-router";
import HomeView from "./views/HomeView.vue";
import SettingsView from "./views/SettingsView.vue";
import InitDbView from "./views/InitDbView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/settings", component: SettingsView },
  { path: "/init-db", component: InitDbView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
