<template>
  <button
    class="j-button"
    :class="{
      [`j-button--${type}`]: type,
      [`j-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
  >
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps } from "./type";

defineProps<ButtonProps>();
</script>

<style scoped></style>
