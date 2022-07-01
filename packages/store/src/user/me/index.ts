import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "me";

export class MeState extends AsyncState<User, undefined> {}

export const { module: meModule, actionCreators } = createModule({
  namespace: NAMESPACE,
  actionName: "me",
  asyncFunction: Service.authService.me,
});

export const { useStartOnMount } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  User,
  null
>(NAMESPACE);
