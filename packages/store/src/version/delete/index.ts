import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { DeleteVersionPayload, Meta } from "../../services/VersionService";

export const NAMESPACE = "delete-version";

export class DeleteVersionState extends AsyncState<
  null,
  DeleteVersionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteVersionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-version",
  // @ts-ignore
  asyncFunction: Service.versionService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteVersionPayload
>(NAMESPACE);
