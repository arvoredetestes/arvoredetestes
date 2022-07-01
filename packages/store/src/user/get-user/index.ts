import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";

import { UserPayload } from "../../services/AuthService";
import { Service } from "../../services/Service";

export const NAMESPACE = "user";

export class UserState extends AsyncState<Omit<User, "token">, UserPayload> {}

export interface CreateUserMeta {
  onSuccess: () => void;
}

export const { module: userModule, actionCreators } = createModule({
  namespace: NAMESPACE,
  actionName: "user",
  asyncFunction: Service.authService.user,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Omit<User, "token">,
  UserPayload
>(NAMESPACE);
