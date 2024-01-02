<template>
  <div class="j-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <slot> </slot>
      <template #content>
        <ul class="j-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            ></li>
            <li
              class="j-dropdown__item"
              @click="($event) => itemClick(item)"
              :class="{
                'is-disabled': item.disabled,
                'is-divided': item.divided,
              }"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :vNode="item.label"></RenderVnode>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import type {
  DropdownProps,
  DropdownInstance,
  DropdownEmits,
  MenuOption,
} from './type';
import type { Ref } from 'vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import type { TooltipInstance } from '../Tooltip/type';
import { ref } from 'vue';
import RenderVnode from '../Common/RenderVnode';

defineOptions({
  name: 'JDropdown',
});

const tooltipRef = ref() as Ref<TooltipInstance>;

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
});
const emits = defineEmits<DropdownEmits>();

const visibleChange = (e: boolean) => {
  emits('visible-change', e);
};

const itemClick = (e: MenuOption) => {
  if (e.disabled) {
    return;
  }
  emits('select', e);
  if (props.hideAfterClick) {
    tooltipRef.value?.hide();
  }
};

defineExpose<DropdownInstance>({
  'show': () => {
    tooltipRef.value?.show();
  },
  'hide': () => {
    tooltipRef.value?.hide();
  },
});
</script>
