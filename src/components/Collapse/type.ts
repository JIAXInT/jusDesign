// 从 Vue 引入 Ref 和 InjectionKey 类型
import type { Ref, InjectionKey } from 'vue';

/**
 * 定义名称类型，支持字符串或数字类型
 */
export type NameType = string | number;

/**
 * 定义 Collapse 组件的属性类型
 * @property {NameType[]} modelValue - 当前激活的 CollapseItem 的名称数组
 * @property {boolean} [accordion] - 是否开启手风琴模式，可选参数
 */
export interface CollapseProps {
  modelValue: NameType[];
  accordion?: boolean;
}

/**
 * 定义 CollapseItem 组件的属性类型
 * @property {NameType} name - CollapseItem 的唯一名称
 * @property {string} [title] - CollapseItem 的标题，可选参数
 * @property {boolean} [disabled] - CollapseItem 是否禁用，可选参数
 */
export interface CollapseItemProps {
  name: NameType;
  title?: string;
  disabled?: boolean;
}

/**
 * 定义 Collapse 组件的上下文类型
 * @property {Ref<NameType[]>} activeNames - 当前激活的 CollapseItem 的名称数组的响应式引用
 * @property {(name: NameType) => void} handleItemClick - 处理 CollapseItem 点击事件的函数
 */
export interface CollapseContext {
  activeNames: Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}

/**
 * 定义 Collapse 组件的事件类型
 * @event update:modelValue - 当激活的 CollapseItem 发生变化时触发，传递新的激活项名称数组
 * @event change - 当激活的 CollapseItem 发生变化时触发，传递新的激活项名称数组
 */
export interface CollapesEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}

/**
 * 定义 Collapse 组件的上下文注入键
 * 用于在组件间共享 CollapseContext 类型的上下文
 */
export const collapseContextKey: InjectionKey<CollapseContext> =
  Symbol('CollapseContext');
