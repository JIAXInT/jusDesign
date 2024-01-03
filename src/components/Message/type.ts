import type { VNode, ComponentInternalInstance } from 'vue';

export interface MessageProps {
  message?: string | VNode;
  duration?: number; //关闭时间 是0则不关闭
  showClose?: boolean; //是否显示关闭按钮
  type?: 'success' | 'info' | 'warning' | 'danger'; //消息类型
  onDestory: () => void;
  id: string;
  zIndex: number;
  offset?: number;
  transitionName?: string;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}

export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>;
