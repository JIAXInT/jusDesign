<script setup>
import { ref } from 'vue';
import Select from '@/components/Select/Select.vue';
const test = ref('1');
const options2 = [
  { label: 'hello', value: '1' },
  { label: 'xyz', value: '2' },
  { label: 'testing', value: '3' },
  { label: 'check', value: '4', disabled: true },
];

const remoteFilter = (query) => {
  return new Promise((resolve) => {
    if (query) {
      setTimeout(() => {
        const options = states
          .filetr((item) => {
            return item.toLowerCase().includes(query.toLowerCase());
          })
          .map((label) => {
            return { label, value: label };
          });
        resolve(options);
      }, 50000);
    } else {
      resolve([]);
    }
  });
};

const handleFetch = (query) => {
  if (!query) return Promise.resolve([]);

  return fetch(`https://api.github.com/search/repositories?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item) => ({
        label: item.name,
        value: item.node_id,
      }));
    });
};
</script>
<template>
  <Select
    v-model="test"
    clearable="true"
    placeholder="基础选择器，请选择"
    :options="options2"
    filterable="true"
    remote
    :remote-method="handleFetch"
  />
  <span>{{ test }}</span>
</template>
