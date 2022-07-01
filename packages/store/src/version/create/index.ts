import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { CreateVersionPayload, Meta } from "../../services/VersionService";

export const NAMESPACE = "create-version";

export class CreateVersionState extends AsyncState<
  null,
  CreateVersionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateVersionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-version",
  // @ts-ignore
  asyncFunction: Service.versionService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateVersionPayload
>(NAMESPACE);
