import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { User } from "@monorepo/types";
import { find } from "lodash";
import { useMemo } from "react";
import { U } from "ts-toolbelt";

import { Service } from "../../services/Service";

export const NAMESPACE = "users";

export class UsersState extends AsyncState<Omit<User, "token">[], null> {}

export const { module: usersModule, actionCreators } = createModule({
  namespace: NAMESPACE,
  actionName: "users",
  asyncFunction: Service.authService.users,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Omit<User, "token">[],
  null
>(NAMESPACE);

export const useUserById = (id: string): U.Nullable<Omit<User, "token">> => {
  useStartOnMount(null, null);
  const data = useData();
  return useMemo(() => {
    return find(data, { _id: id });
  }, [data, id]);
};
