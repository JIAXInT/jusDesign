<script setup lang="ts">
// 从 Vue 引入 ref、onMounted 和 h 函数
import { ref, onMounted, h } from 'vue';
// 引入自定义 Button 组件
import Button from './components/Button/Button.vue';
// 引入 Button 组件的实例类型
import type { ButtonInstance } from './components/Button/type';
// 引入自定义 Collapse 组件
import Collapse from './components/Collapse/Collapse.vue';
// 引入自定义 CollapseItem 组件
import CollapseItem from './components/Collapse/CollapseItem.vue';
// 引入自定义 Icon 组件
import Icon from './components/Icon/Icon.vue';
// 引入自定义 Alert 组件
import Alert from './components/Alert/Alert.vue';
// 引入自定义 Tooltip 组件
import Tooltip from './components/Tooltip/Tooltip.vue';
// 引入 Tooltip 组件的实例类型
import type { TooltipInstance } from './components/Tooltip/type';
// 注释掉的导入，可能后续需要使用
// import type { Options } from '@popperjs/core';
// 引入自定义 Dropdown 组件
import Dropdown from './components/Dropdown/Dropdown.vue';
// 引入 Dropdown 组件的菜单选项类型
import type { MenuOption } from './components/Dropdown/type';
// 注释掉的导入，可能后续需要使用
// import Message from './components/Message/Message.vue';
// 引入创建消息的方法
import { createMessage } from './components/Message/method';
// 引入自定义 Input 组件
import Input from './components/Input/Input.vue';
// 引入自定义 Switch 组件
import Switch from './components/Switch/Switch.vue';
// 引入自定义 Select 组件
import Select from './components/Select/Select.vue';

// 定义按钮组件的引用，初始值为 null
const buttonRef = ref<ButtonInstance | null>(null);
// 定义折叠面板的默认展开项，初始为 ['a']
const openValue = ref(['a']);
// 定义工具提示组件的引用，初始值为 null
const tooltipRef = ref<TooltipInstance>(null);

// 下拉菜单选项数组
const options: MenuOption[] = [
  {
    key: '1',
    // 使用 h 函数创建一个加粗的文本节点作为标签
    label: h('b', 'this is bold'),
  },
  {
    key: '2',
    label: '2',
    // 该选项禁用
    disabled: true,
  },
  {
    key: '3',
    label: '3',
    // 该选项禁用
    disabled: true,
  },
  {
    key: '4',
    label: '4',
  },
];

/**
 * 显示工具提示
 * 调用 Tooltip 实例的 show 方法显示提示框，并在控制台打印实例信息
 */
const openTooltip = () => {
  tooltipRef.value?.show();
  console.log(tooltipRef.value);
};

/**
 * 隐藏工具提示
 * 调用 Tooltip 实例的 hide 方法隐藏提示框
 */
const closeTooltip = () => {
  tooltipRef.value?.hide();
};

/**
 * 组件挂载后执行的操作
 * 如果按钮组件引用存在值，则在控制台打印其 ref 属性
 */
onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref);
  }
});

/**
 * 显示信息类型的消息
 * 使用 createMessage 方法创建一个信息类型的消息框，可关闭
 */
const infoMessage = () => {
  createMessage({
    message: 'info message',
    type: 'info',
    showClose: true,
  });
};

/**
 * 显示成功类型的消息
 * 使用 createMessage 方法创建一个成功类型的消息框，可关闭
 */
const successMessage = () => {
  createMessage({
    message: 'success message',
    type: 'success',
    showClose: true,
  });
};

/**
 * 显示错误类型的消息
 * 使用 createMessage 方法创建一个错误类型的消息框，可关闭
 */
const errorMessage = () => {
  createMessage({
    message: 'error message',
    type: 'danger',
    showClose: true,
  });
};

/**
 * 显示警告类型的消息
 * 使用 createMessage 方法创建一个警告类型的消息框，可关闭
 */
const warningMessage = () => {
  createMessage({
    message: 'warning message',
    type: 'warning',
    showClose: true,
  });
};

// 测试输入框的 v-model 绑定值，初始为空字符串
const test = ref('');
// 选择框的选项数组
const options2 = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
];
</script>

<template>
  <!-- 主内容区域 -->
  <main>
    <!-- 按钮组件展示标题 -->
    <h1>Buttons:</h1>
    <!-- 各种类型和样式的按钮 -->
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
    <!-- 折叠面板组件展示标题 -->
    <h1>Collapse:</h1>
    <!-- 折叠面板组件，使用 v-model 绑定展开项，开启手风琴模式 -->
    <Collapse v-model="openValue" accordion>
      <!-- 折叠面板项，使用具名插槽设置标题 -->
      <CollapseItem name="a">
        <template #title>
          <h1>title</h1>
        </template>
        <div>aaa</div>
      </CollapseItem>
      <!-- 折叠面板项，使用 title 属性设置标题 -->
      <CollapseItem name="b" title="bbb">
        <div>bbbb</div>
      </CollapseItem>
      <!-- 禁用的折叠面板项 -->
      <CollapseItem name="c" title="ccc" disabled>
        <div>cccc</div>
      </CollapseItem>
    </Collapse>
    <br /><br />
    <!-- 图标组件展示标题 -->
    <h1>Icons:</h1>
    <!-- 图标组件，设置图标名称、大小、类型和颜色 -->
    <Icon icon="arrow-up" size="2xl" type="warning" color="green" />
    <br /><br />
    <!-- 提示框组件展示标题 -->
    <h1>Alert:</h1>
    <!-- 各种类型和效果的提示框 -->
    <Alert type="success" effect="light" :closeable="true">this is Alert</Alert>
    <Alert type="info" effect="light">this is Alert</Alert>
    <Alert type="warning" effect="light">this is Alert</Alert>
    <Alert type="danger" effect="light">this is Alert</Alert>
    <Alert type="success" effect="dark">this is Alert</Alert>
    <Alert type="info" effect="dark">this is Alert</Alert>
    <Alert type="warning" effect="dark">this is Alert</Alert>
    <Alert type="danger" effect="dark">this is Alert</Alert>
    <br /><br />
    <!-- 工具提示组件展示标题 -->
    <h1>Tooltip:</h1>
    <!-- 工具提示组件，设置位置、触发方式、引用和延迟时间 -->
    <Tooltip
      placement="top"
      trigger="click"
      ref="tooltipRef"
      :open-delay="200"
      :close-delay="200"
    >
      <Button type="primary">hover me</Button>
      <!-- 工具提示内容 -->
      <template #content>
        <h1>this is tooltip</h1>
      </template>
    </Tooltip>
    <br />
    <br />
    <!-- 打开工具提示的按钮 -->
    <Button type="primary" @click="openTooltip">open Tooltip </Button>
    <!-- 关闭工具提示的按钮 -->
    <Button type="primary" @click="closeTooltip">close Tooltip</Button>
    <br /><br />
    <!-- 下拉菜单组件展示标题 -->
    <h1>Dropdown:</h1>
    <!-- 下拉菜单组件，设置位置、触发方式和菜单选项 -->
    <Dropdown placement="top" trigger="click" :menu-options="options">
      <Button type="primary">hover me</Button>
    </Dropdown>
    <br /><br />
    <!-- 重复的打开工具提示的按钮 -->
    <Button type="primary" @click="openTooltip">open Tooltip </Button>
    <!-- 重复的关闭工具提示的按钮 -->
    <Button type="primary" @click="closeTooltip">close Tooltip</Button>
    <br /><br />
    <!-- 消息框组件展示标题 -->
    <h1>Message:</h1>
    <!-- 触发不同类型消息框的按钮 -->
    <Button type="info" @click="infoMessage">info Message</Button>
    <Button type="success" @click="successMessage">success Message</Button>
    <Button type="danger" @click="errorMessage">error Message</Button>
    <Button type="warning" @click="warningMessage">warning Message</Button>
    <br /><br />
    <!-- 输入框组件展示标题 -->
    <h1>Input:</h1>
    <!-- 输入框组件 -->
    <Input></Input>
    <br /><br />
    <!-- 开关组件展示标题 -->
    <h1>Switch</h1>
    <!-- 开关组件，使用 v-model 绑定值，设置激活和非激活文本及值 -->
    <Switch
      v-model="openValue"
      active-text="on"
      inactive-text="off"
      active-value="right"
      inactive-value="wrong"
    />
    <br /><br />
    <!-- 选择框组件展示标题 -->
    <h1>Select</h1>
    <!-- 选择框组件，使用 v-model 绑定值，设置选项和占位符 -->
    <Select v-model="test" :options="options2" placeholder="select"></Select>
  </main>
</template>

<style scoped>
/* 头部样式 */
header {
  line-height: 1.5;
}

/*  logo 样式 */
.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* 当屏幕宽度大于等于 1024px 时的样式 */
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
