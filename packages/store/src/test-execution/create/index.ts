import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  CreateTestExecutionPayload,
  Meta,
} from "../../services/TestExecutionService";

export const NAMESPACE = "create-test-execution";

export class CreateTestExecutionState extends AsyncState<
  null,
  CreateTestExecutionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateTestExecutionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-testExecution",
  // @ts-ignore
  asyncFunction: Service.testExecutionService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateTestExecutionPayload
>(NAMESPACE);
