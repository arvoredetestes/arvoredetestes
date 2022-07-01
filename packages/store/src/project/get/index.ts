import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Project } from "@monorepo/types";

import { GetProjectPayload, Meta } from "../../services/ProjectService";
import { Service } from "../../services/Service";

export const NAMESPACE = "get-project";

export class GetProjectState extends AsyncState<Project, GetProjectPayload> {}

export const { module, actionCreators } = createModule<
  Project,
  GetProjectPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-project",
  // @ts-ignore
  asyncFunction: Service.projectService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Project,
  GetProjectPayload
>(NAMESPACE);
