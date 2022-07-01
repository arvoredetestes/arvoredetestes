import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { CreateFeaturePayload, Meta } from "../../services/FeatureService";
import { Service } from "../../services/Service";

export const NAMESPACE = "create-feature";

export class CreateFeatureState extends AsyncState<
  null,
  CreateFeaturePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateFeaturePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-feature",
  // @ts-ignore
  asyncFunction: Service.featureService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateFeaturePayload
>(NAMESPACE);
