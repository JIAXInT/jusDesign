<template>
  <i
    class="j-icon"
    :class="{ [`j-icon-${type}`]: type }"
    :style="customStyles"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filterProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { omit } from "lodash-es";
import type { IconProps } from "./type";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

defineOptions({
  name: "JIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();
const filterProps = computed(() => {
  return omit(props, ["type", "color"]);
});

const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>
