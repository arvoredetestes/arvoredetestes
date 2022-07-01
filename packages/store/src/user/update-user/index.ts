import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";

import { UpdateUserPayload } from "../../services/AuthService";
import { Service } from "../../services/Service";

export const NAMESPACE = "update-user";

export class UpdateUserState extends AsyncState<
  Omit<User, "token">,
  UpdateUserPayload
> {}

export interface UpdateUserMeta {
  onSuccess: () => void;
}

export const { module: updateUserModule, actionCreators } = createModule<
  Omit<User, "token">,
  UpdateUserPayload,
  UpdateUserMeta
>({
  namespace: NAMESPACE,
  actionName: "update-user",
  // @ts-ignore
  asyncFunction: Service.authService.updateUser,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Omit<User, "token">,
  UpdateUserPayload
>(NAMESPACE);
