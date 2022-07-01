import {
  AsyncState,
  createAsyncActionHooks,
  createAsyncDataHooks,
  createModule,
} from "@ez-dux/async";
import { ROUTES } from "@monorepo/navigation/src/routes";
import { User, UserRole } from "@monorepo/types";
import isEmpty from "lodash/isEmpty";
import { useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { LoginPayload } from "../../services/AuthService";
import { Service } from "../../services/Service";

export const NAMESPACE = "login";

export class LoginState extends AsyncState<User, LoginPayload> {}

export const { module: loginModule, actionCreators } = createModule({
  namespace: NAMESPACE,
  actionName: "login",
  asyncFunction: Service.authService.login,
});

export const { useStart, useReset } = createAsyncActionHooks(actionCreators);

export const { useData, useError, useLoading } = createAsyncDataHooks<
  User,
  LoginPayload
>(NAMESPACE);

export function useIsUserLoggedIn(): boolean {
  const data = useData();
  return useMemo(() => !isEmpty(data), [data]);
}

export const useLogout = (): (() => void) => {
  const resetLogin = useReset();
  const navigate = useNavigate();
  return useCallback(() => {
    resetLogin();
    localStorage.clear();
    navigate(ROUTES.HOME);
  }, [navigate, resetLogin]);
};

export const AuthListener = (): null => {
  const isUserLoggedIn = useIsUserLoggedIn();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate(ROUTES.HOME);
    }
  }, [isUserLoggedIn, navigate]);
  return null;
};

export function useIsAdmin(): boolean {
  const data = useData();
  return useMemo(() => {
    return !!(data && data.role === UserRole.admin);
  }, [data]);
}
