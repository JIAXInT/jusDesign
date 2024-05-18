// 导入 Vue 的虚拟节点类型
import type { VNode } from 'vue';

// 选择框选项的接口
export interface SelectOption {
  label: string; // 选项显示的文本
  value: string; // 选项对应的值
  disabled?: boolean; // 是否禁用选项，默认可选
}

// 选择框的属性接口
export interface SelectProps {
  modelValue: string; // 绑定的值
  options?: SelectOption[]; // 可选的选项列表
  placeholder: string; // 未选中时显示的占位符
  disabled?: boolean; // 是否禁用选择框，默认可用
  clearable?: boolean; // 是否显示清空按钮，默认不显示
  renderLabel?: RenderLabelFunc; // 自定义渲染选项标签的函数
  filterable?: boolean; // 是否可搜索过滤选项，默认不可搜索
  filterMethod?: CustomFilterFunc; // 自定义过滤选项的函数
  remote?: boolean; // 是否使用远程搜索，默认不使用
  remoteMethod?: CustomFilterRemoteFunc; // 远程搜索选项的函数
}

// 选择框的状态接口
export interface SelectStates {
  inputValue: string; // 输入框的值
  selectedOption: null | SelectOption; // 当前选中的选项
  mouseHover: boolean; // 鼠标是否悬停在选择框上
  loading: boolean; // 是否正在远程搜索
  highlightIndex: number; // 高亮选项的索引
}

// 渲染选项标签的函数类型
export type RenderLabelFunc = (option: SelectOption) => VNode;
// 自定义过滤选项的函数类型
export type CustomFilterFunc = (value: string) => SelectOption[];
// 自定义远程搜索选项的函数类型
export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>;

// 选择框的事件接口
export interface SelectEmits {
  (e: 'change', value: string): void; // 值发生改变时触发
  (e: 'update:modelValue', value: string): void; // 更新绑定值时触发
  (e: 'visible-change', value: boolean): void; // 下拉框显示状态改变时触发
  (e: 'clear'): void; // 清空选项时触发
}
