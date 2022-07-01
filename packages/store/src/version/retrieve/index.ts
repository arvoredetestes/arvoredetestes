import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Version } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-version";

export class RetrieveVersionState extends AsyncState<Version[], null> {}

export const { module, actionCreators } = createModule<Version[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-version",
  asyncFunction: Service.versionService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Version[],
  null
>(NAMESPACE);
