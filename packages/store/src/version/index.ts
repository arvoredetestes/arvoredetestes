import {
  CreateVersionState,
  module as create,
  NAMESPACE as CREATE_VERSION_NAMESPACE,
} from "./create";
import {
  DeleteVersionState,
  module as deleteModule,
  NAMESPACE as DELETE_VERSION_NAMESPACE,
} from "./delete";
import {
  GetVersionState,
  module as get,
  NAMESPACE as GET_VERSION_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_VERSION_NAMESPACE,
  RetrieveVersionState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_VERSION_NAMESPACE,
  UpdateVersionState,
} from "./update";

export interface VersionRootState {
  [CREATE_VERSION_NAMESPACE]: CreateVersionState;
  [DELETE_VERSION_NAMESPACE]: DeleteVersionState;
  [RETRIEVE_VERSION_NAMESPACE]: RetrieveVersionState;
  [GET_VERSION_NAMESPACE]: GetVersionState;
  [UPDATE_VERSION_NAMESPACE]: UpdateVersionState;
}

export const VERSION_MODULES = [create, deleteModule, get, retrieve, update];
