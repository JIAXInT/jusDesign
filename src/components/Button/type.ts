import type { PropType } from 'vue';
export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

// 定义按钮组件的属性接口
export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
  icon?: string;
  loading?: boolean;
}

// 定义按钮组件实例接口
export interface ButtonInstance {
  ref: HTMLButtonElement;
}

// 定义按钮组件的属性配置对象
export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
  },
  size: {
    type: String as PropType<ButtonSize>,
  },
  plain: {
    type: Boolean,
  },
  round: {
    type: Boolean,
  },
  circle: {
    type: Boolean,
  },
  disabled: {
    type: Boolean,
  },
  nativeType: {
    type: String as PropType<NativeType>,
  },
  autofocus: {
    type: Boolean,
  },
};
