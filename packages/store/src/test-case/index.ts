import {
  CreateTestCaseState,
  module as create,
  NAMESPACE as CREATE_TEST_CASE_NAMESPACE,
} from "./create";
import {
  DeleteTestCaseState,
  module as deleteModule,
  NAMESPACE as DELETE_TEST_CASE_NAMESPACE,
} from "./delete";
import {
  GetTestCaseState,
  module as get,
  NAMESPACE as GET_TEST_CASE_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_TEST_CASE_NAMESPACE,
  RetrieveTestCaseState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_TEST_CASE_NAMESPACE,
  UpdateTestCaseState,
} from "./update";

export interface TestCaseRootState {
  [CREATE_TEST_CASE_NAMESPACE]: CreateTestCaseState;
  [DELETE_TEST_CASE_NAMESPACE]: DeleteTestCaseState;
  [RETRIEVE_TEST_CASE_NAMESPACE]: RetrieveTestCaseState;
  [GET_TEST_CASE_NAMESPACE]: GetTestCaseState;
  [UPDATE_TEST_CASE_NAMESPACE]: UpdateTestCaseState;
}

export const TEST_CASE_MODULES = [create, deleteModule, get, retrieve, update];
