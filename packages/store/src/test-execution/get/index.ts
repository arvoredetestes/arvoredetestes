import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestExecution } from "@monorepo/types";

import { Service } from "../../services/Service";
import {
  GetTestExecutionPayload,
  Meta,
} from "../../services/TestExecutionService";

export const NAMESPACE = "get-test-execution";

export class GetTestExecutionState extends AsyncState<
  TestExecution,
  GetTestExecutionPayload
> {}

export const { module, actionCreators } = createModule<
  TestExecution,
  GetTestExecutionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-testExecution",
  // @ts-ignore
  asyncFunction: Service.testExecutionService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestExecution,
  GetTestExecutionPayload
>(NAMESPACE);
