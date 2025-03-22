<template>
  <!-- 定义 CollapseItem 组件的根元素 -->
  <div
    class="j-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 定义 CollapseItem 的头部 -->
    <div
      class="j-collapse-item__header"
      :class="{
        'is-active': isActive,
        'is-disabled': disabled,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <!-- 渲染标题插槽，如果没有提供则显示 title 属性 -->
      <slot name="title"> {{ title }}</slot>
      <!-- 显示箭头图标 -->
      <Icon icon="angle-right" class="header-angle" />
    </div>

    <!-- 使用过渡动画包装内容区域 -->
    <Transition name="slide" v-on="transitionEvents">
      <!-- 内容区域的包装器，根据 isActive 状态显示或隐藏 -->
      <div class="j-collapse-item__wrapper" v-show="isActive">
        <!-- 内容区域 -->
        <div class="j-collapse-item__content" :id="`item-content-${name}`">
          <!-- 渲染默认插槽 -->
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// 引入 Vue 相关的函数
import { inject, computed } from 'vue';
// 引入 CollapseItem 的属性类型
import type { CollapseItemProps } from './type';
// 引入 Collapse 的上下文 key
import { collapseContextKey } from './type';
// 引入 Icon 组件
import Icon from '../Icon/Icon.vue';

/**
 * CollapseItem 组件
 *
 * @component
 * @description 可折叠面板的单个项目组件
 */
defineOptions({
  name: 'JCollapseItem',
});
// 定义组件的 props
const props = defineProps<CollapseItemProps>();

// 通过 inject 获取 Collapse 的上下文
const collapseContext = inject(collapseContextKey);
// 计算当前 CollapseItem 是否处于激活状态
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);
/**
 * 处理 CollapseItem 头部的点击事件
 *
 * @description 如果 CollapseItem 是禁用状态，则不执行任何操作；否则调用 Collapse 上下文的 handleItemClick 方法
 */
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name);
};

/**
 * 过渡动画事件处理函数
 *
 * @description 控制 CollapseItem 内容区域展开和折叠时的过渡动画
 */
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 进入过渡前的处理
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  // 进入过渡时的处理
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  // 进入过渡完成后的处理
  afterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
  // 离开过渡前的处理
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  // 离开过渡时的处理
  leave(el) {
    el.style.height = '0px';
  },
  // 离开过渡完成后的处理
  afterLeave(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
};
</script>

<style></style>
