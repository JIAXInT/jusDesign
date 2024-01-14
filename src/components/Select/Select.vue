<template>
  <div
    class="j-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
  >
    <Tooltip placement="bottom-start" manual>
      <Input
        ref="toolotipRef"
        v-model="innerValue"
        :disabled="disabled"
        :placeholder="placeholder"
      />
    </Tooltip>
    <template #content>
      <ul class="j-select__menu">
        <li
          v-for="(item, index) in options"
          :key="index"
          class="j-select__item"
          :class="{ 'is-disabled': disabled }"
          :id="`select-item-${item.value}`"
        >
          {{ item.label }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { SelectEmits, SelectProps } from './type';
import type { TooltipInstance } from '../Tooltip/type';
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';

defineOptions({
  name: 'JSelect',
});

const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const toolotipRef = ref() as Ref<TooltipInstance>;

const innerValue = ref<string>('');
const isDropDownShow = ref(false);
const controlDropdown = (show: boolean) => {
  if (show) {
    toolotipRef.value.show();
  } else {
    toolotipRef.value.hide();
  }
  isDropDownShow.value = show;
  emits('visible-change', show);
};
const toggleDropdown = () => {
  if (props.disabled) return;
  if (isDropDownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
</script>
