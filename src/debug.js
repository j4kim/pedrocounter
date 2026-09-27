import { useStorage } from "@vueuse/core";

export const debug = useStorage("pedrocounter-debug");

export function log() {
  if (debug.value) {
    console.log(...arguments);
  }
}
