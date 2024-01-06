export interface InputProps {
  type: string;
  modelValue: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  //input事件 值有变化就触发
  (e: 'input', value: string): void;
  //change事件 修改了值并且失去了foucs时触发
  (e: 'change', value: string): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
  (e: 'clear'): void;
}
