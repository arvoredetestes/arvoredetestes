import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { TestScript } from "@monorepo/types";

import { Service } from "../../services/Service";
import { GetTestScriptPayload, Meta } from "../../services/TestScriptService";

export const NAMESPACE = "get-test-script";

export class GetTestScriptState extends AsyncState<
  TestScript,
  GetTestScriptPayload
> {}

export const { module, actionCreators } = createModule<
  TestScript,
  GetTestScriptPayload,
  Meta
>({
  namespace: NAMESPACE,
  actionName: "get-testScript",
  // @ts-ignore
  asyncFunction: Service.testScriptService.get,
});

export const { useStartOnMount, useStart } =
  createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  TestScript,
  GetTestScriptPayload
>(NAMESPACE);
