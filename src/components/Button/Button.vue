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
    <!-- 加载状态时显示旋转图标 -->
    <Icon icon="spinner" spin v-if="loading" />
    <!-- 如果有自定义图标则显示 -->
    <Icon :icon="icon" v-if="icon" />
    <!-- 按钮内容插槽 -->
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from './type';
import Icon from '../Icon/Icon.vue';

// 定义组件名称
defineOptions({
  name: 'JButton',
});

// 定义并设置默认属性
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button',
});

// 按钮元素的引用
const _ref = ref<HTMLButtonElement>();

// 暴露按钮元素的引用给父组件
defineExpose({
  ref: _ref,
});
</script>

<style scoped></style>
