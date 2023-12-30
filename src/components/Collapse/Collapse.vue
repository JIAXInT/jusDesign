<template>
  <div class="j-collapse"><slot></slot></div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { NameType, CollapseProps, CollapesEmits } from "./type";
import { collapseContextKey } from "./type";

defineOptions({
  name: "JCollapse",
});

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapesEmits>();

const activeNames = ref<NameType[]>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    activeNames.value = props.modelValue;
  }
);
if (props.accordion && activeNames.value.length > 1) {
  console.warn("手风琴模式只能打开一项");
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? "" : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      //存在 删除数组中对应的一项
      activeNames.value.splice(index, 1);
    } else {
      //不存在 则添加
      activeNames.value.push(item);
    }
  }
  emits("update:modelValue", activeNames.value);
  emits("change", activeNames.value);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>
