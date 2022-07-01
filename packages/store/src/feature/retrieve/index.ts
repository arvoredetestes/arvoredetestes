import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Feature } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-feature";

export class RetrieveFeatureState extends AsyncState<Feature[], null> {}

export const { module, actionCreators } = createModule<Feature[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-feature",
  asyncFunction: Service.featureService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Feature[],
  null
>(NAMESPACE);
