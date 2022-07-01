import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestExecution } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-test-execution";

export class RetrieveTestExecutionState extends AsyncState<
  TestExecution[],
  null
> {}

export const { module, actionCreators } = createModule<TestExecution[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-testExecution",
  asyncFunction: Service.testExecutionService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestExecution[],
  null
>(NAMESPACE);
