import { keyBy, keys } from "lodash";

import { MessageKeys } from "./index";
import pt_BR from "./pt_br";

export const TEXT_KEYS: Record<MessageKeys, MessageKeys> = keyBy(
  keys(pt_BR)
) as Record<MessageKeys, MessageKeys>;
