import pt_BR from "./pt_br";

export type MessageKeys = keyof typeof pt_BR;

export const PT_BR_BUNDLE = pt_BR;

export interface Message {
  key?: MessageKeys;
  values?: Record<string, any>;
}

export function useText({ key }: Message): string {
  if (key) return PT_BR_BUNDLE[key];
  return "";
}
