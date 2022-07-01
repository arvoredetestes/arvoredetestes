import {
  CreateTestScriptState,
  module as create,
  NAMESPACE as CREATE_TEST_SCRIPT_NAMESPACE,
} from "./create";
import {
  DeleteTestScriptState,
  module as deleteModule,
  NAMESPACE as DELETE_TEST_SCRIPT_NAMESPACE,
} from "./delete";
import {
  GetTestScriptState,
  module as get,
  NAMESPACE as GET_TEST_SCRIPT_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_TEST_SCRIPT_NAMESPACE,
  RetrieveTestScriptState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_TEST_SCRIPT_NAMESPACE,
  UpdateTestScriptState,
} from "./update";

export interface TestScriptRootState {
  [CREATE_TEST_SCRIPT_NAMESPACE]: CreateTestScriptState;
  [DELETE_TEST_SCRIPT_NAMESPACE]: DeleteTestScriptState;
  [RETRIEVE_TEST_SCRIPT_NAMESPACE]: RetrieveTestScriptState;
  [GET_TEST_SCRIPT_NAMESPACE]: GetTestScriptState;
  [UPDATE_TEST_SCRIPT_NAMESPACE]: UpdateTestScriptState;
}

export const TEST_SCRIPT_MODULES = [
  create,
  deleteModule,
  get,
  retrieve,
  update,
];
