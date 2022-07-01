import axios from "axios";
import noop from "lodash/noop";

import { useReset } from "../user/login";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
});

export function useAxiosInterceptors(): void {
  const resetLogin = useReset();
  api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("auth-token");
    if (token && config.headers) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if ([401].includes(error.response.status)) {
        resetLogin();
        localStorage.clear();
      } else if ([403].includes(error.response.status)) {
        alert("Não autorizado");
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export const PARAMS_SINGLETON = {
  project: null,
  version: null,
};

try {
  PARAMS_SINGLETON.project = JSON.parse(
    localStorage.getItem("project") || "{}"
  );
  PARAMS_SINGLETON.version = JSON.parse(
    localStorage.getItem("version") || "{}"
  );
} catch (e) {
  noop(e);
}
export function getParams(): {
  project: string;
  version: string;
} {
  const project = PARAMS_SINGLETON.project;
  const version = PARAMS_SINGLETON.version;
  return {
    // @ts-ignore
    project: project?._id,
    // @ts-ignore
    version: version?._id,
  };
}
