<script setup lang="ts">
import { ref, onMounted, h } from 'vue';
import Button from './components/Button/Button.vue';
import type { ButtonInstance } from './components/Button/type';
import Collapse from './components/Collapse/Collapse.vue';
import CollapseItem from './components/Collapse/CollapseItem.vue';
import Icon from './components/Icon/Icon.vue';
import Alert from './components/Alert/Alert.vue';
import Tooltip from './components/Tooltip/Tooltip.vue';
import { TooltipInstance } from './components/Tooltip/type';
// import type { Options } from '@popperjs/core';
import Dropdown from './components/Dropdown/Dropdown.vue';
import type { MenuOption } from './components/Dropdown/type';
// import Message from './components/Message/Message.vue';
import { createMessage } from './components/Message/method';
import Input from './components/Input/Input.vue';
import Switch from './components/Switch/Switch.vue';
import Select from './components/Select/Select.vue';

const buttonRef = ref<ButtonInstance | null>(null);
const openValue = ref(['a']);
const tooltipRef = ref<TooltipInstance>(null);

const options: MenuOption[] = [
  {
    key: '1',
    label: h('b', 'this is bold'),
  },
  {
    key: '2',
    label: '2',
    disabled: true,
  },
  {
    key: '3',
    label: '3',
    disabled: true,
  },
  {
    key: '4',
    label: '4',
  },
];

const openTooltip = () => {
  tooltipRef.value?.show();
  console.log(tooltipRef.value);
};
const closeTooltip = () => {
  tooltipRef.value?.hide();
};

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
});

const infoMessage = () => {
  createMessage({
    message: 'info message',
    type: 'info',
    showClose: true,
  });
};
const successMessage = () => {
  createMessage({
    message: 'success message',
    type: 'success',
    showClose: true,
  });
};
const errorMessage = () => {
  createMessage({
    message: 'error message',
    type: 'danger',
    showClose: true,
  });
};
const warningMessage = () => {
  createMessage({
    message: 'warning message',
    type: 'warning',
    showClose: true,
  });
};

const test = ref('');
const options2 = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
];
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
    <br /><br />
    <h1>Tooltip:</h1>
    <Tooltip
      placement="top"
      trigger="click"
      ref="tooltipRef"
      :open-delay="200"
      :close-delay="200"
    >
      <Button type="primary">hover me</Button>
      <template #content>
        <h1>this is tooltip</h1>
      </template>
    </Tooltip>
    <br />
    <br />
    <Button type="primary" @click="openTooltip">open Tooltip </Button>
    <Button type="primary" @click="closeTooltip">close Tooltip</Button>
    <br /><br />
    <h1>Dropdown:</h1>
    <Dropdown placement="top" trigger="click" :menu-options="options">
      <Button type="primary">hover me</Button>
    </Dropdown>
    <br /><br />
    <Button type="primary" @click="openTooltip">open Tooltip </Button>
    <Button type="primary" @click="closeTooltip">close Tooltip</Button>
    <br /><br />
    <h1>Message:</h1>
    <Button type="info" @click="infoMessage">info Message</Button>
    <Button type="success" @click="successMessage">success Message</Button>
    <Button type="danger" @click="errorMessage">error Message</Button>
    <Button type="warning" @click="warningMessage">warning Message</Button>
    <br /><br />
    <h1>Input:</h1>
    <Input></Input>
    <br /><br />
    <h1>Switch</h1>
    <Switch
      v-model="openValue"
      active-text="on"
      inactive-text="off"
      active-value="right"
      inactive-value="wrong"
    />
    <br /><br />
    <h1>Select</h1>
    <Select v-model="test" :options="options2" placeholder="select"></Select>
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
