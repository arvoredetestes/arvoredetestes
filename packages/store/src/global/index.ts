import {
  createActionCreator,
  createReducer,
  createSelector,
} from "@ez-dux/core";
import { createDispatchAnActionHook } from "@ez-dux/react";
import { createModule } from "@ez-dux/react/lib/module";
import { Project, Version } from "@monorepo/types";
import { useSelector } from "react-redux";
import { U } from "ts-toolbelt";

export const NAMESPACE = "global";

class DashboardSelection {
  section?: string = "";
  id?: string = "";
  route?: string = "";
}
export class GlobalState {
  project: U.Nullable<Project> = null;
  version: U.Nullable<Version> = null;
  dashboardSelection: DashboardSelection = new DashboardSelection();
}

export interface GlobalRootState {
  [NAMESPACE]: GlobalState;
}

const setProject = createActionCreator<U.Nullable<Project>>("set-project");
export const useSetGlobalProject = createDispatchAnActionHook(setProject);

const setVersion = createActionCreator<U.Nullable<Version>>("set-version");
export const useSetGlobalVersion = createDispatchAnActionHook(setVersion);

const setDashboardSelection = createActionCreator<
  U.Nullable<DashboardSelection>
>("set-dashboard-selection");
export const useSetDashboardSelection = createDispatchAnActionHook(
  setDashboardSelection
);

const globalProjectSelector = createSelector<
  GlobalState["project"],
  GlobalState
>(NAMESPACE, "project");

const globalVersionSelector = createSelector<
  GlobalState["version"],
  GlobalState
>(NAMESPACE, "version");

const dashboardSelectionSelector = createSelector<
  GlobalState["dashboardSelection"],
  GlobalState
>(NAMESPACE, "dashboardSelection");

export const useGlobalProject = (): GlobalState["project"] =>
  useSelector(globalProjectSelector);

export const useGlobalVersion = (): GlobalState["version"] =>
  useSelector(globalVersionSelector);

export const useDashboardSelection = (): GlobalState["dashboardSelection"] =>
  useSelector(dashboardSelectionSelector);

type Action = ReturnType<
  typeof setProject | typeof setVersion | typeof setDashboardSelection
>;

const INITIAL_STATE = new GlobalState();
const reducer = createReducer<Action, GlobalState>(INITIAL_STATE);

reducer.addCase(setProject, (state, action) => {
  localStorage.setItem("project", JSON.stringify(action.payload));
  return {
    ...state,
    project: action.payload as U.Nullable<Project>,
  };
});

reducer.addCase(setVersion, (state, action) => {
  localStorage.setItem("version", JSON.stringify(action.payload));
  return {
    ...state,
    version: action.payload as U.Nullable<Version>,
  };
});

reducer.addCase(setDashboardSelection, (state, action) => {
  localStorage.setItem("dashboardSelection", JSON.stringify(action.payload));
  return {
    ...state,
    dashboardSelection: action.payload as DashboardSelection,
  };
});

export const globalModule = createModule({
  id: NAMESPACE,
  reducerMap: {
    // @ts-ignore
    [NAMESPACE]: reducer,
  },
});
