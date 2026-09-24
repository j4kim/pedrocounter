import { useStorage } from "@vueuse/core";
import GUN from "gun";
import { computed, ref, watch } from "vue";

export const dbId = useStorage("perdocounter-dbId");

export let gun = GUN(["https://gun.jo2.ch/gun"]);

export let gunRootNode = null;

export async function connectToDb(newDbId) {
  dbId.value = newDbId;
  gunRootNode = gun.get("pedrocounter-" + dbId.value);
}

export async function disconnectFromDb() {
  if (
    confirm(
      "Les données actuelles seront remplacées par vos données locales. OK ?",
    )
  ) {
    dbId.value = null;
    location.reload();
  }
}
