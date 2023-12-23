<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "./components/Button/Button.vue";
import type { ButtonInstance } from "./components/Button/type";

const buttonRef = ref<ButtonInstance | null>(null);

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
});
</script>

<template>
  <main>
    <Button type="primary">primary</Button>
    <Button type="success">success</Button>
    <Button type="warning">warning</Button>
    <Button type="danger" round>danger</Button>
    <Button type="info" circle>info</Button>
    <Button type="info" disabled>info</Button>
    <br />
    <br />
    <Button type="primary" plain>primary</Button>
    <Button type="success" plain>success</Button>
    <Button type="warning" plain>warning</Button>
    <Button type="danger" plain round>danger</Button>
    <Button type="info" plain circle>info</Button>
    <Button type="info" plain disabled>info</Button>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
