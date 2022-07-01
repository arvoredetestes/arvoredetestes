import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";

import { Service } from "../../services/Service";
import {
  DeleteTestScriptPayload,
  Meta,
} from "../../services/TestScriptService";

export const NAMESPACE = "delete-test-script";

export class DeleteTestScriptState extends AsyncState<
  null,
  DeleteTestScriptPayload
> {}

export const { module, actionCreators } = createModule<
  null,
  DeleteTestScriptPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "delete-testScript",
  // @ts-ignore
  asyncFunction: Service.testScriptService.delete,
});

export const { useStart } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  null,
  DeleteTestScriptPayload
>(NAMESPACE);
