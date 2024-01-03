import { computed, ref } from 'vue';

/**
 * 用于管理z-index的自定义hook
 * @param initialValue 初始值，默认为2000
 * @returns {currentZIndex, nextZIndex, initialZIndex}
 */

const zIndex = ref(0);
const useZIndex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue);

  /**
   * 当前z-index的计算属性
   */
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value);

  /**
   * 获取下一个z-index值
   * @returns {number} 下一个z-index值
   */
  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    currentZIndex,
    nextZIndex,
    initialZIndex,
  };
};

// 默认导出useZIndex函数
export default useZIndex;
