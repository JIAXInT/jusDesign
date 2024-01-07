<template>
  <div
    class="j-switch"
    :class="{
      [`j-switch--${size}`]: size,
      'is-disable': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      ref="input"
      class="j-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="j-switch__core">
      <div class="j-switch__core-inner">
        <span
          v-if="activeText || inactiveText"
          class="j-switch__core-inner-text"
        >
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="j-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import type { SwitchProps, SwitchEmits } from './type';

defineOptions({
  name: 'JSwitch',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const innerValue = ref(props.modelValue);
const input = ref<HTMLInputElement>();
// 现在是否被选中
const checked = computed(() => innerValue.value === props.activeValue);

const switchValue = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits('update:modelValue', newValue);
  emits('change', newValue);
};

onMounted(() => {
  input.value!.checked = checked.value;
});
watch(checked, (val) => {
  input.value!.checked = val;
});
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);
</script>
