<template>
  <!-- 定义 Collapse 组件的根元素，添加类名 'j-collapse'，并渲染插槽内容 -->
  <div class="j-collapse"><slot></slot></div>
</template>

<script setup lang="ts">
// 引入 Vue 相关的函数
import { ref, provide, watch } from 'vue';
// 引入 Collapse 组件的属性类型、事件类型以及名称类型
import type { NameType, CollapseProps, CollapesEmits } from './type';
// 引入 Collapse 的上下文 key
import { collapseContextKey } from './type';

/**
 * Collapse 组件
 *
 * @component
 * @description 可折叠面板组件，支持手风琴模式
 */
defineOptions({
  name: 'JCollapse',
});

// 定义组件的 props
const props = defineProps<CollapseProps>();
// 定义组件的 emits 事件
const emits = defineEmits<CollapesEmits>();

// 使用 ref 来存储当前激活的项的名称
const activeNames = ref<NameType[]>(props.modelValue);

// 监听 props.modelValue 的变化，并同步到 activeNames
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);

// 如果是手风琴模式且激活项数量大于 1，给出警告
if (props.accordion && activeNames.value.length > 1) {
  console.warn('手风琴模式只能打开一项');
}

/**
 * 处理 CollapseItem 点击事件
 *
 * @param {NameType} item - 被点击的 CollapseItem 的名称
 * @description 根据手风琴模式和当前激活项状态，更新激活项列表，并触发相应事件
 */
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    // 手风琴模式下，切换激活项
    activeNames.value = [activeNames.value[0] === item ? '' : item];
  } else {
    // 非手风琴模式下，添加或移除激活项
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      // 存在则从数组中删除对应的一项
      activeNames.value.splice(index, 1);
    } else {
      // 不存在则添加
      activeNames.value.push(item);
    }
  }
  // 触发更新绑定值的事件
  emits('update:modelValue', activeNames.value);
  // 触发 change 事件
  emits('change', activeNames.value);
};

// 提供 Collapse 的上下文，供子组件使用
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
