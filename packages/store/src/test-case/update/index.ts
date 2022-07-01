import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import { Meta, UpdateTestCasePayload } from "../../services/TestCaseService";

export const NAMESPACE = "update-test-case";

export class UpdateTestCaseState extends AsyncState<
  null,
  UpdateTestCasePayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateTestCasePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-testCase",
  // @ts-ignore
  asyncFunction: Service.testCaseService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateTestCasePayload
>(NAMESPACE);
