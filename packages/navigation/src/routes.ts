export const ROUTES = {
  HOME: "/",
  ME: "/me",
  TEAM: "/team",
  getTeamMemberRoute: (id: string): string => "/team/:id".replace(":id", id),
  getTeamMemberEditRoute: (id: string): string =>
    "/team/:id/edit".replace(":id", id),
  TEAM_NEW_MEMBER: "/team/new-member",
  HELP: "/help",
  VERSION: "/version",
  getEditVersionRoute: (id: string): string =>
    "/project/:id".replace(":id", id),
  PROJECT: "/project",
  getEditProjectRoute: (id: string): string =>
    "/project/:id".replace(":id", id),
  FEATURES: "/features",
  NEW_FEATURE: "/features?new=true",
  getFeatureDetailRoute: (id: string): string =>
    "/feature/:id".replace(":id", id),
  getFeatureTestCasesRoute: (id: string): string =>
    "/feature/:id/test-cases".replace(":id", id),
  getFeatureTestCaseRoute: (id: string, testCaseId: string): string =>
    "/feature/:id/test-case/:testCaseId"
      .replace(":id", id)
      .replace(":testCaseId", testCaseId),
  getExecuteTestCaseRoute: (id: string, testCaseId: string): string =>
    "/feature/:id/test-case/:testCaseId?execute=true"
      .replace(":id", id)
      .replace(":testCaseId", testCaseId),
  getFeatureTestExecutionsRoute: (id: string): string =>
    "/feature/:id/test-executions".replace(":id", id),
  getFeatureTestExecutionRoute: (id: string, testExecutionId: string): string =>
    "/feature/:id/test-execution/:testExecutionId"
      .replace(":id", id)
      .replace(":testExecutionId", testExecutionId),
  getFeatureTestScriptsRoute: (id: string): string =>
    "/feature/:id/test-scripts".replace(":id", id),
  getFeatureTestScriptRoute: (id: string, testScriptId: string): string =>
    "/feature/:id/test-script/:testScriptId"
      .replace(":id", id)
      .replace(":testScriptId", testScriptId),
  getExecuteTestScriptRoute: (id: string, testScript: string): string =>
    "/feature/:id/test-script/:testScript?execute=true"
      .replace(":id", id)
      .replace(":testScript", testScript),
  TEST_CASES: "/test-cases",
  NEW_TEST_CASE: "/test-cases?new=true",
  getTestCaseDetailsRoute: (id: string): string =>
    "/test-case/:id".replace(":id", id),
  TEST_EXECUTIONS: "/test-executions",
  NEW_TEST_EXECUTION: "/test-executions?new=true",
  getTestExecutionDetailsRoute: (id: string): string =>
    "/test-execution/:id".replace(":id", id),
  TEST_SCRIPTS: "/test-scripts",
  NEW_TEST_SCRIPT: "/test-scripts?new=true",
  getTestScriptDetailsRoute: (id: string): string =>
    "/test-script/:id".replace(":id", id),
};
