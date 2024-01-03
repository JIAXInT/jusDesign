import { isRef, onBeforeUnmount, onMounted, unref, watch } from 'vue';
import type { Ref } from 'vue';

/**
 * 在Vue中使用的事件监听器
 *
 * @param target - 事件目标
 * @param event - 事件名称
 * @param handler - 事件处理函数
 */
export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (value, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      value?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }

  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
