import auth from "./routes/auth";
import feature from "./routes/feature";
import general from "./routes/general";
import health from "./routes/health-check";
import item from "./routes/item";
import project from "./routes/project";
import testCase from "./routes/test-case";
import testExecution from "./routes/test-execution";
import testScript from "./routes/test-script";
import user from "./routes/user";
import version from "./routes/version";

const routes = [
  auth,
  item,
  user,
  general,
  health,
  project,
  version,
  testCase,
  testExecution,
  testScript,
  feature,
];

export default routes;
