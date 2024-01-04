---
title: Button
description: Button 组件文档
---

# Button 按钮

常用的操作按钮

## 基础用法

使用`type` ` plain` `round` `circle` 来定义按钮样式

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态

使用 `disabled` 属性定义按钮是否被禁用
<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button 组件的禁用状态"></preview>

## 图标按钮

使用 `icon` 属性来为按钮添加图标。图标名称请看 fontawesome 官网 https://fontawesome.com/icons
<preview path="../demo/Button/Icons.vue" title="图标按钮·" description="Button 组件的图标按钮"></preview>

## 加载状态按钮

使用 `loading` 属性来定义按钮的加载状态
<preview path="../demo/Button/Loading.vue" title="加载状态" description="Button 组件的加载状态"></preview>

## 不同大小的按钮

使用 `size` 属性来定义按钮的大小
<preview path="../demo/Button/Size.vue" title="不同大小的按钮" description="Button 组件的不同大小的按钮"></preview>

### Button Attributes

| Name        | Description                            | Type                                                             | Default |
| ----------- | -------------------------------------- | ---------------------------------------------------------------- | ------- |
| size        | button size                            | `enum` - `'large'\| 'small'`                                     | —       |
| type        | button type                            | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | determine whether it's a plain button  | `boolean`                                                        | false   |
| round       | determine whether it's a round button  | `boolean`                                                        | false   |
| circle      | determine whether it's a circle button | `boolean`                                                        | false   |
| loading     | determine whether it's loading         | `boolean`                                                        | false   |
| disabled    | disable the button                     | `boolean`                                                        | false   |
| icon        | icon component                         | `string`                                                         | —       |
| autofocus   | same as native button's `autofocus`    | `boolean`                                                        | false   |
| native-type | same as native button's `type`         | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
