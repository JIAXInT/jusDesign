<template>
  <div
    class="j-input"
    :class="{
      [`j-input--${type}`]: type,
      [`j-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="j-input__prepend">
        <slot name="prepend"></slot>
      </div>
      <div class="j-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="j-input__prefix">
          <slot name="prefix "></slot>
        </span>
        <input
          ref="inputRef"
          class="j-input__inner"
          v-bind="attrs"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :placeholder="placeholder"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="j-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix"></slot>
          <Icon
            icon="circle-xmark"
            v-if="showClear"
            class="j-input__clear"
            @click="clear"
            @mousedown.prevent="NOOP"
          ></Icon>
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="j-input__password"
            @click="tooglePasswordVisible"
          ></Icon>
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="j-input__password"
            @click="tooglePasswordVisible"
          ></Icon>
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="j-input__append">
        <slot name="append"></slot>
      </div>
    </template>

    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        class="j-textarea__wrapper"
        v-bind="attrs"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      ></textarea>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, nextTick, ref, useAttrs, watch } from 'vue';
import type { InputProps, InputEmits } from './type';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name: 'JInput',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
});
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref() as Ref<HTMLInputElement>;

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);

const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);
const tooglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const keepFocus = async () => {
  await nextTick();
  inputRef.value.focus();
};
const handleInput = () => {
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
};
const handleChange = () => {
  emits('change', innerValue.value);
};
const NOOP = () => {};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits('focus', event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits('blur', event);
};
const clear = () => {
  innerValue.value = '';
  emits('update:modelValue', '');
  emits('clear');
  emits('input', '');
  emits('change', '');
};
watch(
  () => props.modelValue,
  (newValue) => {
    innerValue.value = newValue;
  }
);

defineExpose({
  ref: inputRef,
});
</script>
