<script setup>
import { ref, h } from 'vue';
import Select from '@/components/Select/Select.vue';
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
];

const customRender = (option) => {
  return h('div', { class: 'xyz' }, [
    h('b', option.label),
    h('span', option.value),
  ]);
};
</script>
<template>
  <Select
    v-model="test"
    clearable="true"
    placeholder="基础选择器，请选择"
    :options="options2"
    :render-label="customRender"
  />
</template>
