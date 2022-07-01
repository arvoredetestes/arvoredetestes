import {
  createUserModule as create,
  CreateUserState,
  NAMESPACE as CREATE_USER_NAMESPACE,
} from "./create-user";
import {
  deleteUserModule as deleteModule,
  DeleteUserState,
  NAMESPACE as DELETE_USER_NAMESPACE,
} from "./delete-user";
import {
  NAMESPACE as GET_USER_NAMESPACE,
  userModule as get,
  UserState,
} from "./get-user";
import {
  loginModule as login,
  LoginState,
  NAMESPACE as LOGIN_NAMESPACE,
} from "./login";
import { meModule as me, MeState, NAMESPACE as ME_NAMESPACE } from "./me";
import {
  NAMESPACE as UPDATE_USER_NAMESPACE,
  updateUserModule as update,
  UpdateUserState,
} from "./update-user";
import {
  NAMESPACE as USERS_NAMESPACE,
  usersModule as users,
  UsersState,
} from "./users";

export interface UserRootState {
  [CREATE_USER_NAMESPACE]: CreateUserState;
  [DELETE_USER_NAMESPACE]: DeleteUserState;
  [GET_USER_NAMESPACE]: UserState;
  [UPDATE_USER_NAMESPACE]: UpdateUserState;
  [LOGIN_NAMESPACE]: LoginState;
  [ME_NAMESPACE]: MeState;
  [USERS_NAMESPACE]: UsersState;
}

export const USER_MODULES = [
  create,
  deleteModule,
  get,
  update,
  login,
  me,
  users,
];
