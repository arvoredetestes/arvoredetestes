import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { CreateTestCasePayload, Meta } from "../../services/TestCaseService";

export const NAMESPACE = "create-test-case";

export class CreateTestCaseState extends AsyncState<
  null,
  CreateTestCasePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateTestCasePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-testCase",
  // @ts-ignore
  asyncFunction: Service.testCaseService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateTestCasePayload
>(NAMESPACE);
