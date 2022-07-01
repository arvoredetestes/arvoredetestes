import { getSagaExtension } from "@ez-dux/async";
import { Store } from "@ez-dux/react";
import { createStore } from "@ez-dux/react";
import noop from "lodash/noop";

import { FEATURE_MODULES, FeatureRootState } from "./feature";
import {
  globalModule,
  GlobalRootState,
  GlobalState,
  NAMESPACE as GLOBAL_NAMESPACE,
} from "./global";
import { PROJECT_MODULES, ProjectRootState } from "./project";
import { TEST_CASE_MODULES, TestCaseRootState } from "./test-case";
import {
  TEST_EXECUTION_MODULES,
  TestExecutionRootState,
} from "./test-execution";
import { TEST_SCRIPT_MODULES, TestScriptRootState } from "./test-script";
import { USER_MODULES, UserRootState } from "./user";
import { LoginState, NAMESPACE as LOGIN_NAMESPACE } from "./user/login";
import { VERSION_MODULES, VersionRootState } from "./version";

export type RootState = ProjectRootState &
  UserRootState &
  VersionRootState &
  GlobalRootState &
  FeatureRootState &
  TestExecutionRootState &
  TestScriptRootState &
  TestCaseRootState;

export async function initStore(): Promise<Store<RootState>> {
  const loginState = new LoginState();
  const globalState = new GlobalState();
  try {
    const loginStateFromLocalStorage =
      localStorage.getItem("login-module-data");
    const project = localStorage.getItem("project");
    const version = localStorage.getItem("version");
    if (loginStateFromLocalStorage) {
      loginState.data = JSON.parse(loginStateFromLocalStorage);
    }
    if (project) {
      globalState.project = JSON.parse(project);
    }
    if (version) {
      globalState.version = JSON.parse(version);
    }
  } catch (e) {
    noop(e);
  }
  return createStore<RootState>(
    {
      initialState: {
        [LOGIN_NAMESPACE]: loginState,
        [GLOBAL_NAMESPACE]: globalState,
      },
      extensions: [getSagaExtension({})],
    },
    globalModule,
    ...PROJECT_MODULES,
    ...USER_MODULES,
    ...VERSION_MODULES,
    ...FEATURE_MODULES,
    ...TEST_CASE_MODULES,
    ...TEST_EXECUTION_MODULES,
    ...TEST_SCRIPT_MODULES
  );
}
