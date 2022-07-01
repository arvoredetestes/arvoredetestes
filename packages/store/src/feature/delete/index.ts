import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { DeleteFeaturePayload, Meta } from "../../services/FeatureService";
import { Service } from "../../services/Service";

export const NAMESPACE = "delete-feature";

export class DeleteFeatureState extends AsyncState<
  null,
  DeleteFeaturePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteFeaturePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-feature",
  // @ts-ignore
  asyncFunction: Service.featureService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteFeaturePayload
>(NAMESPACE);
