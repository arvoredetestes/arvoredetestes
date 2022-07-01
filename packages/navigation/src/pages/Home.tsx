import { LoginForm } from "@monorepo/forms/src/login/LoginForm";
import { TreeView } from "@monorepo/layout";
import { Splash } from "@monorepo/layout/src/splash/Splash";
import { useIsUserLoggedIn } from "@monorepo/store/src/user/login";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack, useTheme } from "@mui/material";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);
import {
  useData as useFeatures,
  useStartOnMount as useLoadFeaturesOnMount,
} from "@monorepo/store/src/feature/retrieve";
import {
  useData as useTestCases,
  useStartOnMount as useLoadTestCasesOnMount,
} from "@monorepo/store/src/test-case/retrieve";
import {
  useData as useTestExecutions,
  useStartOnMount as useLoadTestExecutionsOnMount,
} from "@monorepo/store/src/test-execution/retrieve";
import {
  useData as useTestScripts,
  useStartOnMount as useLoadTestScriptsOnMount,
} from "@monorepo/store/src/test-script/retrieve";
import { useBoolean } from "ahooks";
import { filter, size } from "lodash";

import { ROUTES } from "../routes";

const SX = { fontWeight: "bold", textTransform: "uppercase" };

export function useHideTree(): boolean {
  const location = useLocation();
  const isUserLoggedIn = useIsUserLoggedIn();
  return (
    !isUserLoggedIn ||
    [ROUTES.HELP, ROUTES.TEAM, ROUTES.ME].includes(location.pathname)
  );
}
export const TreeViewSide: React.FC = () => {
  const { palette } = useTheme();
  const hideTree = useHideTree();
  if (hideTree) return null;
  return (
    <Stack
      width='30vw'
      height='100vh'
      p={3}
      bgcolor={palette.secondary.light}
      boxShadow={2}
      spacing={2}
    >
      <Link to={ROUTES.FEATURES}>
        <Text messageKey={TEXT_KEYS.FEATURES} sx={SX} />
      </Link>
      <TreeView />
    </Stack>
  );
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Resultados",
    },
  },
};

function usePieChartData() {
  useLoadFeaturesOnMount(null, null);
  useLoadTestCasesOnMount(null, null);
  useLoadTestExecutionsOnMount(null, null);
  useLoadTestScriptsOnMount(null, null);
  const features = useFeatures();
  const testCases = useTestCases();
  const testExecutions = useTestExecutions();
  const testScripts = useTestScripts();

  return useMemo(
    () => ({
      labels: [
        "Funcionalidades",
        "Casos de Teste",
        "Execuções de Teste",
        "Roteiros de Teste",
      ],
      datasets: [
        {
          label: "Quantidade",
          data: [
            size(features),
            size(testCases),
            size(testExecutions),
            size(testScripts),
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [features, testCases, testExecutions, testScripts]
  );
}
function useBarChartData() {
  useLoadTestExecutionsOnMount(null, null);

  const testExecutions = useTestExecutions();

  return useMemo(
    () => ({
      labels: ["Passou", "Falhou"],
      datasets: [
        {
          label: "Resultado",
          data: [
            size(filter(testExecutions, { resolution: true })),
            size(filter(testExecutions, { resolution: false })),
          ],
          backgroundColor: [
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 99, 132, 0.5)",
          ],
        },
      ],
    }),
    [testExecutions]
  );
}
export function Charts(): React.ReactElement {
  const pie = usePieChartData();
  const bar = useBarChartData();
  return (
    <Paper>
      <Stack direction='row' spacing={3} p={5}>
        <Stack>
          <Pie data={pie} />
        </Stack>
        <Stack>
          <Bar options={options} data={bar} />
        </Stack>
      </Stack>
    </Paper>
  );
}

const BoardsView: React.FC = () => {
  const [showCharts, { setTrue }] = useBoolean();
  return (
    <Stack width='70vw' p={6} justifyContent='center' alignItems='center'>
      {showCharts && <Charts />}
      {!showCharts && <Splash onAnimationEnd={setTrue} />}
    </Stack>
  );
};
const Dashboard: React.FC = () => <BoardsView />;

export const Home: React.FC = () => {
  const isUserLoggedIn = useIsUserLoggedIn();
  return !isUserLoggedIn ? <LoginForm /> : <Dashboard />;
};
