import { Header } from "@monorepo/layout";
import { useAxiosInterceptors } from "@monorepo/store/src/services/api";
import { AuthListener } from "@monorepo/store/src/user/login";
import { Stack } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { FeatureDetails, Features } from "./pages/Features";
import { Help } from "./pages/Help";
import { Home, TreeViewSide, useHideTree } from "./pages/Home";
import { EditProject, Project } from "./pages/Project";
import {
  Team,
  TeamEditMember,
  TeamMe,
  TeamMember,
  TeamNewMember,
} from "./pages/Team";
import { TestCaseDetails, TestCases } from "./pages/TestCases";
import { TestExecutionDetails, TestExecutions } from "./pages/TestExecutions";
import { TestScriptDetails, TestScripts } from "./pages/TestScripts";
import { EditVersion, Version } from "./pages/Version";
import { ROUTES } from "./routes";

export const Navigation: React.FC = () => {
  useAxiosInterceptors();
  const hideTree = useHideTree();
  return (
    <Stack>
      <Header />
      <Stack
        direction='row'
        width='100vw'
        height='100vh'
        paddingTop='60px'
        alignItems={!hideTree ? "flex-start" : "center"}
        justifyContent={!hideTree ? "flex-start" : "center"}
      >
        <TreeViewSide />
        <AuthListener />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.HELP} element={<Help />} />
          <Route path={ROUTES.VERSION} element={<Version />} />
          <Route path={ROUTES.PROJECT} element={<Project />} />
          <Route
            path={ROUTES.getEditProjectRoute(":id")}
            element={<EditProject />}
          />
          <Route path={ROUTES.FEATURES} element={<Features />} />
          <Route
            path={ROUTES.getFeatureDetailRoute(":id")}
            element={<FeatureDetails />}
          />
          <Route
            path={ROUTES.getFeatureTestCasesRoute(":id")}
            element={<TestCases />}
          />
          <Route
            path={ROUTES.getFeatureTestCaseRoute(":id", ":testCaseId")}
            element={<TestCaseDetails />}
          />
          <Route
            path={ROUTES.getFeatureTestExecutionsRoute(":id")}
            element={<TestExecutions />}
          />
          <Route
            path={ROUTES.getFeatureTestExecutionRoute(
              ":id",
              ":testExecutionId"
            )}
            element={<TestExecutionDetails />}
          />
          <Route
            path={ROUTES.getFeatureTestScriptsRoute(":id")}
            element={<TestScripts />}
          />
          <Route
            path={ROUTES.getFeatureTestScriptRoute(":id", ":testScriptId")}
            element={<TestScriptDetails />}
          />
          <Route path={ROUTES.TEST_CASES} element={<TestCases />} />
          <Route
            path={ROUTES.getTestCaseDetailsRoute(":id")}
            element={<TestCaseDetails />}
          />
          <Route path={ROUTES.TEST_EXECUTIONS} element={<TestExecutions />} />
          <Route
            path={ROUTES.getTestExecutionDetailsRoute(":id")}
            element={<TestExecutionDetails />}
          />
          <Route path={ROUTES.TEST_SCRIPTS} element={<TestScripts />} />
          <Route
            path={ROUTES.getTestScriptDetailsRoute(":id")}
            element={<TestScriptDetails />}
          />
          <Route path={ROUTES.VERSION} element={<Version />} />
          <Route
            path={ROUTES.getEditVersionRoute(":id")}
            element={<EditVersion />}
          />
          <Route path={ROUTES.TEAM} element={<Team />} />
          <Route path={ROUTES.TEAM_NEW_MEMBER} element={<TeamNewMember />} />
          <Route path={ROUTES.ME} element={<TeamMe />} />
          <Route
            path={ROUTES.getTeamMemberEditRoute(":id")}
            element={<TeamEditMember />}
          />
          <Route
            path={ROUTES.getTeamMemberRoute(":id")}
            element={<TeamMember />}
          />
        </Routes>
      </Stack>
    </Stack>
  );
};
