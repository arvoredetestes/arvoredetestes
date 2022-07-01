import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";

import { CreateUserPayload } from "../../services/AuthService";
import { Service } from "../../services/Service";

export const NAMESPACE = "create-user";

export class CreateUserState extends AsyncState<
  Omit<User, "token">,
  CreateUserPayload
> {}

export interface CreateUserMeta {
  onSuccess: () => void;
}

export const { module: createUserModule, actionCreators } = createModule<
  Omit<User, "token">,
  CreateUserPayload,
  CreateUserMeta
>({
  namespace: NAMESPACE,
  actionName: "create-user",
  // @ts-ignore
  asyncFunction: Service.authService.createUser,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Omit<User, "token">,
  CreateUserPayload
>(NAMESPACE);
