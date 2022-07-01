import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { Meta, UpdateVersionPayload } from "../../services/VersionService";

export const NAMESPACE = "update-version";

export class UpdateVersionState extends AsyncState<
  null,
  UpdateVersionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateVersionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-version",
  // @ts-ignore
  asyncFunction: Service.versionService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateVersionPayload
>(NAMESPACE);
