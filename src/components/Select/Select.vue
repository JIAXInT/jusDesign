<template>
  <div
    class="j-select"
    :class="{ 'is-disabled': disabled }"
    @click="toggleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      ref="tooltipRef"
      placement="bottom-start"
      :popperOptions="popperOptions"
      @click-outside="controlDropdown(false)"
      manual
    >
      <Input
        ref="inputRef"
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filterPlaceholder"
        :readonly="!filterable || !isDropDownShow"
        @input="debouceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <Icon
            icon="circle-xmark"
            v-if="showClearIcon"
            class="j-input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          ></Icon>

          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropDownShow }"
          ></Icon>
        </template>
      </Input>
      <template #content>
        <div class="j-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin></Icon>
        </div>
        <div
          class="j-select__nodata"
          v-else-if="filteredOptions.length === 0 && filterable"
        >
          no matching data
        </div>
        <ul class="j-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="j-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': index === states.highlightIndex,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode
                :vNode="renderLabel ? renderLabel(item) : item.label"
              ></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { Ref } from 'vue';
import type {
  SelectEmits,
  SelectOption,
  SelectProps,
  SelectStates,
} from './type';
import type { TooltipInstance } from '../Tooltip/type';
import Input from '../Input/Input.vue';
import Icon from '../Icon/Icon.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import RenderVnode from '../Common/RenderVnode';
import type { InputInstance } from '../Input/type';
import { debounce, filter, isFunction } from 'lodash-es';
import { s } from 'vitest/dist/env-afee91f0';

const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};

// 定义选项
defineOptions({
  name: 'JSelect',
});

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
}); // 定义 props

const timeout = computed(() => (props.remote ? 300 : 0));

const emits = defineEmits<SelectEmits>(); // 定义 emits
const initialOption = findOption(props.modelValue);
const tooltipRef = ref() as Ref<TooltipInstance>; // 定义 tooltipRef
const inputRef = ref() as Ref<InputInstance>; // 定义 inputRef
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '', // 输入框值
  selectedOption: initialOption, // 选中的选项
  mouseHover: false, // 鼠标是否悬停
  loading: false, // 是否正在加载
  highlightIndex: -1, // 高亮选项索引
}); // 定义状态
const isDropDownShow = ref(false); // 下拉菜单是否显示
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
};

const filteredOptions = ref(props.options);
watch(
  () => props.options,
  (newOption) => {
    filteredOptions.value = newOption;
  }
);
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.log(e);
      filteredOptions.value = [];
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
  states.highlightIndex = -1; // 重置高亮选项索引
};
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
const debouceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);
const filterPlaceholder = computed(() => {
  return props.filterable && states.selectedOption && isDropDownShow.value
    ? states.selectedOption.label
    : props.placeholder;
});

const controlDropdown = (show: boolean) => {
  // 控制下拉菜单显示状态
  console.log(tooltipRef.value);
  // 显示或隐藏下拉菜单
  if (show) {
    // filter模式 之前选择过对应的值
    if (props.filterable && states.selectedOption) {
      states.inputValue = ''; // 更新输入框值
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
    tooltipRef.value?.show();
  } else {
    tooltipRef.value?.hide();
    // blur的时候将之前选择的值回灌到input中
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : ''; // 更新输入框值
    }
    states.highlightIndex = -1; // 重置高亮选项索引
  }
  isDropDownShow.value = show; // 更新下拉菜单显示状态
  emits('visible-change', show); // 触发 visible-change 事件
};

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropDownShow.value) {
        controlDropdown(true);
      } else {
        if (
          states.highlightIndex > -1 &&
          filteredOptions.value[states.highlightIndex]
        ) {
          itemSelect(filteredOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case 'Escape':
      if (isDropDownShow.value) {
        controlDropdown(false);
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex === -1 || states.highlightIndex === 0) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          states.highlightIndex--;
        }
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
  }
};

const showClearIcon = computed(() => {
  return (
    props.clearable &&
    states.mouseHover &&
    states.inputValue.trim() !== '' &&
    states.selectedOption
  ); // 是否显示清除图标
});

const onClear = () => {
  states.selectedOption = null; // 清空选中的选项
  states.inputValue = ''; // 清空输入框值
  emits('clear');
  emits('change', ''); // 触发 change 事件
  emits('update:modelValue', ''); // 触发 update:modelValue 事件
};

const NOOP = () => {};

const toggleDropdown = () => {
  // 切换下拉菜单显示状态
  if (props.disabled) return; // 如果禁用状态，直接返回
  if (isDropDownShow.value) {
    // 如果下拉菜单已显示
    controlDropdown(false); // 隐藏下拉菜单
  } else {
    controlDropdown(true); // 显示下拉菜单
  }
};

const itemSelect = (e: SelectOption) => {
  if (e.disabled) return; // 如果选项禁用，直接返回
  states.inputValue = e.label; // 更新输入框值
  states.selectedOption = e; // 更新选中的选项
  emits('change', e.value); // 触发 change 事件
  emits('update:modelValue', e.value); // 触发 update:modelValue 事件
  controlDropdown(false); // 隐藏下拉菜单
  inputRef.value.ref.focus(); // 聚焦输入框
};
</script>
