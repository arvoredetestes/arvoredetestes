import { AuthService } from "./AuthService";
import { FeatureService } from "./FeatureService";
import { ProjectService } from "./ProjectService";
import { TestCaseService } from "./TestCaseService";
import { TestExecutionService } from "./TestExecutionService";
import { TestScriptService } from "./TestScriptService";
import { VersionService } from "./VersionService";

export const Service = {
  authService: AuthService,
  projectService: ProjectService,
  versionService: VersionService,
  featureService: FeatureService,
  testCaseService: TestCaseService,
  testExecutionService: TestExecutionService,
  testScriptService: TestScriptService,
};
