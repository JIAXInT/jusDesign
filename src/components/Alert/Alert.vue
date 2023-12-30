<template>
  <Transition name="j-alert-fade" :closeable="closeable">
    <div
      class="j-alert"
      :class="{ [`j-alert__${type}`]: type, [`j-alert__${effect}`]: effect }"
      v-if="isClosed"
    >
      <div class="j-alert__content">
        <slot>{{ content }}</slot>
      </div>
      <div class="j-alert__close" @click="close" v-if="closeable">
        <Icon icon="close" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AlertProps } from "./type";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "JAlert",
});

defineProps<AlertProps>();

let isClosed = ref(true);
const close = () => {
  isClosed.value = false;
};
</script>
