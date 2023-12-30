export interface AlertProps {
  content?: string;
  type?: "info" | "success" | "warning" | "danger" | "primary";
  effect?: "light" | "dark";
  closeable?: boolean;
}

export interface AlertEvents {
  (e: "close"): void;
}

export interface Instance {
  close: () => void;
}
