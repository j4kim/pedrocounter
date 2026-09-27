import { useStorage } from "@vueuse/core";
import GUN from "gun";
import { computed, ref, watch } from "vue";

export const dbId = useStorage("perdocounter-dbId");

export const gun = GUN(import.meta.env.VITE_GUN_PEERS.split(","));

export let rootNode, itemsNode, settingsNode;

export const itemsMap = ref(new Map());

export const settings = ref({
  users: [],
});

const jsonSettings = computed(() => JSON.stringify(settings.value));

watch(jsonSettings, (newValue) => settingsNode.put(newValue));

export const itemsArray = computed(() => {
  let km;
  return Array.from(itemsMap.value).map(([id, item]) => {
    item.id = id;
    if (km) {
      item.delta = item.km - km;
    }
    km = item.km;
    delete item._;
    return item;
  });
});

export const displayedItems = ref(2);

export const pagedItemsArray = computed(() => {
  return itemsArray.value.slice(-displayedItems.value);
});

export const lastItem = computed(() => {
  return itemsArray.value[itemsArray.value.length - 1];
});

export const deltaSum = computed(() =>
  itemsArray.value.reduce((a, i) => a + (i.delta ?? 0), 0),
);

export const deltaSumByUser = computed(() => {
  const result = {};
  itemsArray.value.forEach((item) => {
    if (item.type !== "restitution") {
      return;
    }
    if (result[item.user]) {
      result[item.user] = result[item.user] + item.delta;
    } else {
      result[item.user] = item.delta;
    }
  });
  return result;
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
  settingsNode = rootNode.get("settings");
  settingsNode.on((newJsonSettings) => {
    console.log("on settings", newJsonSettings);
    if (newJsonSettings !== jsonSettings.value) {
      settings.value = JSON.parse(newJsonSettings);
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
  dbId.value = null;
  location.reload();
}
