import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  Meta,
  UpdateTestScriptPayload,
} from "../../services/TestScriptService";

export const NAMESPACE = "update-test-script";

export class UpdateTestScriptState extends AsyncState<
  null,
  UpdateTestScriptPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  UpdateTestScriptPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "update-testScript",
  // @ts-ignore
  asyncFunction: Service.testScriptService.update,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  UpdateTestScriptPayload
>(NAMESPACE);
