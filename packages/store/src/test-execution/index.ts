import {
  CreateTestExecutionState,
  module as create,
  NAMESPACE as CREATE_TEST_EXECUTION_NAMESPACE,
} from "./create";
import {
  DeleteTestExecutionState,
  module as deleteModule,
  NAMESPACE as DELETE_TEST_EXECUTION_NAMESPACE,
} from "./delete";
import {
  GetTestExecutionState,
  module as get,
  NAMESPACE as GET_TEST_EXECUTION_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_TEST_EXECUTION_NAMESPACE,
  RetrieveTestExecutionState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_TEST_EXECUTION_NAMESPACE,
  UpdateTestExecutionState,
} from "./update";

export interface TestExecutionRootState {
  [CREATE_TEST_EXECUTION_NAMESPACE]: CreateTestExecutionState;
  [DELETE_TEST_EXECUTION_NAMESPACE]: DeleteTestExecutionState;
  [RETRIEVE_TEST_EXECUTION_NAMESPACE]: RetrieveTestExecutionState;
  [GET_TEST_EXECUTION_NAMESPACE]: GetTestExecutionState;
  [UPDATE_TEST_EXECUTION_NAMESPACE]: UpdateTestExecutionState;
}

export const TEST_EXECUTION_MODULES = [
  create,
  deleteModule,
  get,
  retrieve,
  update,
];
