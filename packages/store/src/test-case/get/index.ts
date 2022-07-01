import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestCase } from "@monorepo/types";

import { Service } from "../../services/Service";
import { GetTestCasePayload, Meta } from "../../services/TestCaseService";

export const NAMESPACE = "get-test-case";

export class GetTestCaseState extends AsyncState<
  TestCase,
  GetTestCasePayload
> {}

export const { module, actionCreators } = createModule<
  TestCase,
  GetTestCasePayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-testCase",
  // @ts-ignore
  asyncFunction: Service.testCaseService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestCase,
  GetTestCasePayload
>(NAMESPACE);
