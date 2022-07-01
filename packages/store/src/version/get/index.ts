import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Version } from "@monorepo/types";

import { Service } from "../../services/Service";
import { GetVersionPayload, Meta } from "../../services/VersionService";

export const NAMESPACE = "get-version";

export class GetVersionState extends AsyncState<Version, GetVersionPayload> {}

export const { module, actionCreators } = createModule<
  Version,
  GetVersionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-version",
  // @ts-ignore
  asyncFunction: Service.versionService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Version,
  GetVersionPayload
>(NAMESPACE);
