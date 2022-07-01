import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Feature } from "@monorepo/types";

import { GetFeaturePayload, Meta } from "../../services/FeatureService";
import { Service } from "../../services/Service";

export const NAMESPACE = "get-feature";

export class GetFeatureState extends AsyncState<Feature, GetFeaturePayload> {}

export const { module, actionCreators } = createModule<
  Feature,
  GetFeaturePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-feature",
  // @ts-ignore
  asyncFunction: Service.featureService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Feature,
  GetFeaturePayload
>(NAMESPACE);
