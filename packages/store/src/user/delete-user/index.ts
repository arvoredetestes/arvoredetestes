import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";

import { DeleteUserPayload } from "../../services/AuthService";
import { Service } from "../../services/Service";

export const NAMESPACE = "delete-user";

export class DeleteUserState extends AsyncState<
  Omit<User, "token">,
  DeleteUserPayload
> {}

export interface DeleteUserMeta {
  onSuccess: () => void;
}

export const { module: deleteUserModule, actionCreators } = createModule<
  Omit<User, "token">,
  DeleteUserPayload,
  DeleteUserMeta
>({
  namespace: NAMESPACE,
  actionName: "delete-user",
  // @ts-ignore
  asyncFunction: Service.authService.deleteUser,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Omit<User, "token">,
  DeleteUserPayload
>(NAMESPACE);
