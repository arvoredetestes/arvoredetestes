import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { Project } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-project";

export class RetrieveProjectState extends AsyncState<Project[], null> {}

export const { module, actionCreators } = createModule<Project[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-project",
  asyncFunction: Service.projectService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  Project[],
  null
>(NAMESPACE);
