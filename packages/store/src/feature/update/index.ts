import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Meta, UpdateFeaturePayload } from "../../services/FeatureService";
import { Service } from "../../services/Service";

export const NAMESPACE = "update-feature";

export class UpdateFeatureState extends AsyncState<
  null,
  UpdateFeaturePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateFeaturePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-feature",
  // @ts-ignore
  asyncFunction: Service.featureService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateFeaturePayload
>(NAMESPACE);
