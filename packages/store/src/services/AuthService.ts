import { User } from "@monorepo/types";

import { RootState } from "../index";
import { CreateUserMeta } from "../user/create-user";
import { api } from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}
export interface UserPayload {
  id: string;
}

export type UpdateUserPayload = CreateUserPayload & UserPayload;

interface UserBaseResponse {
  status: string;
  message: string;
}
export type DeleteUserPayload = UserPayload;

export interface LoginResponse extends UserBaseResponse {
  data: User;
}

export interface CreateUserResponseResponse extends UserBaseResponse {
  data: Omit<User, "token">;
}

export interface UsersResponseResponse extends UserBaseResponse {
  data: Omit<User, "token">[];
}

export class AuthService {
  static login: (payload: LoginPayload) => Promise<User> = async (payload) => {
    const response = await api.post<LoginResponse>("/user/login", payload);
    localStorage.setItem("auth-token", response.data.data.token);
    localStorage.setItem(
      "login-module-data",
      JSON.stringify(response.data.data)
    );
    return response.data.data;
  };
  static createUser: (
    payload: CreateUserPayload,
    state: RootState,
    meta: CreateUserMeta
  ) => Promise<Omit<User, "token">> = async (payload, state, { onSuccess }) => {
    const response = await api.post<CreateUserResponseResponse>(
      "/user",
      payload
    );
    onSuccess();
    return response.data.data;
  };
  static me: () => Promise<User> = async () => {
    const response = await api.get<LoginResponse>("/user/me/auth");
    return response.data.data;
  };
  static users: () => Promise<Omit<User, "token">[]> = async () => {
    const response = await api.get<UsersResponseResponse>("/users");
    return response.data.data;
  };
  static user: (payload: UserPayload) => Promise<Omit<User, "token">> = async (
    payload
  ) => {
    const response = await api.get<CreateUserResponseResponse>(
      "/user/:id".replace(":id", payload.id)
    );
    return response.data.data;
  };
  static updateUser: (
    payload: UpdateUserPayload,
    state: RootState,
    meta: CreateUserMeta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    const id = payload.id;
    const body = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    };
    await api.patch<UserBaseResponse>("/user/:id".replace(":id", id), body);
    onSuccess();
  };
  static deleteUser: (
    payload: DeleteUserPayload,
    state: RootState,
    meta: CreateUserMeta
  ) => Promise<void> = async (payload, state, { onSuccess }) => {
    const id = payload.id;
    await api.delete<UserBaseResponse>("/user/:id".replace(":id", id));
    onSuccess();
  };
}
