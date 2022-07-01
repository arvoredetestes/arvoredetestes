import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { DeleteTestCasePayload, Meta } from "../../services/TestCaseService";

export const NAMESPACE = "delete-test-case";

export class DeleteTestCaseState extends AsyncState<
  null,
  DeleteTestCasePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteTestCasePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-testCase",
  // @ts-ignore
  asyncFunction: Service.testCaseService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteTestCasePayload
>(NAMESPACE);
