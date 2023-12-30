<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "./components/Button/Button.vue";
import type { ButtonInstance } from "./components/Button/type";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Alert from "./components/Alert/Alert.vue";

const buttonRef = ref<ButtonInstance | null>(null);
const openValue = ref(["a"]);

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
});
</script>

<template>
  <main>
    <h1>Buttons:</h1>
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
    <br />
    <br />
    <Button type="primary" size="large" plain loading>loading</Button>
    <Button type="primary" size="large" icon="arrow-up">Icon</Button>
    <h1>Collapse:</h1>
    <Collapse v-model="openValue" accordion>
      <CollapseItem name="a">
        <template #title>
          <h1>title</h1>
        </template>
        <div>aaa</div>
      </CollapseItem>
      <CollapseItem name="b" title="bbb">
        <div>bbbb</div>
      </CollapseItem>
      <CollapseItem name="c" title="ccc" disabled>
        <div>cccc</div>
      </CollapseItem>
    </Collapse>
    <br /><br />
    <h1>Icons:</h1>
    <Icon icon="arrow-up" size="2xl" type="warning" color="green" />
    <br /><br />
    <h1>Alert:</h1>
    <Alert type="success" effect="light" :closeable="true">this is Alert</Alert>
    <Alert type="info" effect="light">this is Alert</Alert>
    <Alert type="warning" effect="light">this is Alert</Alert>
    <Alert type="danger" effect="light">this is Alert</Alert>
    <Alert type="success" effect="dark">this is Alert</Alert>
    <Alert type="info" effect="dark">this is Alert</Alert>
    <Alert type="warning" effect="dark">this is Alert</Alert>
    <Alert type="danger" effect="dark">this is Alert</Alert>
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
