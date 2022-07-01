import {
  CreateFeatureState,
  module as create,
  NAMESPACE as CREATE_FEATURE_NAMESPACE,
} from "./create";
import {
  DeleteFeatureState,
  module as deleteModule,
  NAMESPACE as DELETE_FEATURE_NAMESPACE,
} from "./delete";
import {
  GetFeatureState,
  module as get,
  NAMESPACE as GET_FEATURE_NAMESPACE,
} from "./get";
import {
  module as retrieve,
  NAMESPACE as RETRIEVE_FEATURE_NAMESPACE,
  RetrieveFeatureState,
} from "./retrieve";
import {
  module as update,
  NAMESPACE as UPDATE_FEATURE_NAMESPACE,
  UpdateFeatureState,
} from "./update";

export interface FeatureRootState {
  [CREATE_FEATURE_NAMESPACE]: CreateFeatureState;
  [DELETE_FEATURE_NAMESPACE]: DeleteFeatureState;
  [RETRIEVE_FEATURE_NAMESPACE]: RetrieveFeatureState;
  [GET_FEATURE_NAMESPACE]: GetFeatureState;
  [UPDATE_FEATURE_NAMESPACE]: UpdateFeatureState;
}

export const FEATURE_MODULES = [create, deleteModule, get, retrieve, update];
