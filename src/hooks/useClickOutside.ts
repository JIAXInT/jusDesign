/**
 * 使用useClickOutside函数创建一个自定义hook，用于监听元素的点击事件外部的事件
 * @param elementRef - 要监听的元素的Ref对象
 * @param callback - 当点击事件发生时执行的回调函数，接受一个鼠标点击事件对象作为参数
 */
import type { Ref } from "vue";
import { onMounted, onUnmounted } from "vue";

const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  /**
   * 点击事件的处理函数
   * @param e - 鼠标点击事件对象
   */
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
  });

  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
};

export default useClickOutside;
