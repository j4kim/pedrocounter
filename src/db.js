import { useStorage } from "@vueuse/core";
import GUN from "gun";
import { computed, ref, watch } from "vue";

export const dbId = useStorage("perdocounter-dbId");

export const gun = GUN(import.meta.env.VITE_GUN_PEERS.split(","));

export let rootNode, itemsNode;

export const itemsMap = ref(new Map());

export const itemsArray = computed(() => {
  return Array.from(itemsMap.value);
});

export async function connectToDb(newDbId) {
  console.log("connectToDb", dbId);
  dbId.value = newDbId;
  rootNode = gun.get("pedrocounter-" + dbId.value);
  itemsNode = rootNode.get("items");
  itemsNode.map().on(function (item, id) {
    console.log("on item", item, id);
    if (item) {
      itemsMap.value.set(id, item);
    } else {
      itemsMap.value.delete(id);
    }
  });
}

export function addItem(newItem) {
  itemsNode.set(newItem);
}

export function deleteItem(id) {
  itemsNode.get(id).put(null);
}

if (dbId.value) {
  connectToDb(dbId.value);
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
