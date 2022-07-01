import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { DeleteProjectPayload, Meta } from "../../services/ProjectService";
import { Service } from "../../services/Service";

export const NAMESPACE = "delete-project";

export class DeleteProjectState extends AsyncState<
  null,
  DeleteProjectPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteProjectPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-project",
  // @ts-ignore
  asyncFunction: Service.projectService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteProjectPayload
>(NAMESPACE);
