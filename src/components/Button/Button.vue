<template>
  <button
    ref="_ref"
    class="j-button"
    :class="{
      [`j-button--${type}`]: type,
      [`j-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./type";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "JButton",
});

withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});

const _ref = ref<HTMLButtonElement>();

defineExpose({
  ref: _ref,
});
</script>

<style scoped></style>
