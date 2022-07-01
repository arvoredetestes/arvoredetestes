import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  DeleteTestExecutionPayload,
  Meta,
} from "../../services/TestExecutionService";

export const NAMESPACE = "delete-test-execution";

export class DeleteTestExecutionState extends AsyncState<
  null,
  DeleteTestExecutionPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteTestExecutionPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-testExecution",
  // @ts-ignore
  asyncFunction: Service.testExecutionService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteTestExecutionPayload
>(NAMESPACE);
