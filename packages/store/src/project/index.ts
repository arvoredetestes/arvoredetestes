import {
  CreateProjectState,
  module as create,
  NAMESPACE as CREATE_PROJECT_NAMESPACE,
} from "./create";
import {
  DeleteProjectState,
  module as deleteModule,
  NAMESPACE as DELETE_PROJECT_NAMESPACE,
} from "./delete";
import {
  GetProjectState,
  module as get,
  NAMESPACE as GET_PROJECT_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_PROJECT_NAMESPACE,
  RetrieveProjectState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_PROJECT_NAMESPACE,
  UpdateProjectState,
} from "./update";

export interface ProjectRootState {
  [CREATE_PROJECT_NAMESPACE]: CreateProjectState;
  [DELETE_PROJECT_NAMESPACE]: DeleteProjectState;
  [RETRIEVE_PROJECT_NAMESPACE]: RetrieveProjectState;
  [GET_PROJECT_NAMESPACE]: GetProjectState;
  [UPDATE_PROJECT_NAMESPACE]: UpdateProjectState;
}

export const PROJECT_MODULES = [create, deleteModule, get, retrieve, update];
