import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestCase } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-test-case";

export class RetrieveTestCaseState extends AsyncState<TestCase[], null> {}

export const { module, actionCreators } = createModule<TestCase[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-testCase",
  asyncFunction: Service.testCaseService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestCase[],
  null
>(NAMESPACE);
