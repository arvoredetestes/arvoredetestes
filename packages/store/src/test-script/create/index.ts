import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  CreateTestScriptPayload,
  Meta,
} from "../../services/TestScriptService";

export const NAMESPACE = "create-test-script";

export class CreateTestScriptState extends AsyncState<
  null,
  CreateTestScriptPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  CreateTestScriptPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "create-testScript",
  // @ts-ignore
  asyncFunction: Service.testScriptService.create,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  CreateTestScriptPayload
>(NAMESPACE);
