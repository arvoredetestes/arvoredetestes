import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestScript } from "@monorepo/types";

import { Service } from "../../services/Service";

export const NAMESPACE = "retrieve-test-script";

export class RetrieveTestScriptState extends AsyncState<TestScript[], null> {}

export const { module, actionCreators } = createModule<TestScript[], null>({
  namespace: NAMESPACE,
  actionName: "retrieve-testScript",
  asyncFunction: Service.testScriptService.retrieve,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestScript[],
  null
>(NAMESPACE);
