import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  Meta,
  UpdateTestExecutionPayload,
} from "../../services/TestExecutionService";

export const NAMESPACE = "update-test-execution";

export class UpdateTestExecutionState extends AsyncState<
  null,
  UpdateTestExecutionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateTestExecutionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-testExecution",
  // @ts-ignore
  asyncFunction: Service.testExecutionService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateTestExecutionPayload
>(NAMESPACE);
