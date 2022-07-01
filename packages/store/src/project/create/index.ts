import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { CreateProjectPayload, Meta } from "../../services/ProjectService";
import { Service } from "../../services/Service";

export const NAMESPACE = "create-project";

export class CreateProjectState extends AsyncState<
  null,
  CreateProjectPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateProjectPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-project",
  // @ts-ignore
  asyncFunction: Service.projectService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateProjectPayload
>(NAMESPACE);
