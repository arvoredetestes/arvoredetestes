import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Meta, UpdateProjectPayload } from "../../services/ProjectService";
import { Service } from "../../services/Service";

export const NAMESPACE = "update-project";

export class UpdateProjectState extends AsyncState<
  null,
  UpdateProjectPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateProjectPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-project",
  // @ts-ignore
  asyncFunction: Service.projectService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateProjectPayload
>(NAMESPACE);
