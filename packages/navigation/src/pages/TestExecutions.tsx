import { EditTestExecutionForm } from "@monorepo/forms/src/test-execution/NewTestExecutionForm";
import { useStart } from "@monorepo/store/src/test-execution/delete";
import {
  useData as useTestExecutions,
  useStart as useLoadTestExecutions,
  useStartOnMount as useLoadTestExecutionsOnMount,
} from "@monorepo/store/src/test-execution/retrieve";
import { useUserById } from "@monorepo/store/src/user/users";
import { BasicText, DateText, Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
import { FiEye, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

import { ROUTES } from "../routes";

const TEXT_SX = {
  textTransform: "uppercase",
  fontWeight: "bold",
};

interface ActionsCells {
  params: Record<string, any>;
}
const ActionsCells: React.FC<ActionsCells> = ({ params }: ActionsCells) => {
  const deleteTestExecution = useStart();
  const loadTestExecutions = useLoadTestExecutions();
  const onClick = useCallback(() => {
    deleteTestExecution(
      { id: params.id },
      { onSuccess: () => loadTestExecutions(null, null) }
    );
  }, [deleteTestExecution, loadTestExecutions, params.id]);
  return (
    <Stack direction='row' spacing={2}>
      <Link to={ROUTES.getTestExecutionDetailsRoute(params.id as string)}>
        <FiEye />
      </Link>
      <a onClick={onClick}>
        <FiTrash />
      </a>
    </Stack>
  );
};

const User = ({ executedBy }: { executedBy: string }) => {
  const user = useUserById(executedBy);

  return <BasicText>{user?.name}</BasicText>;
};
const columns: GridColDef[] = [
  {
    field: "name",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.NAME} />,
    sortable: true,
    width: 150,
  },
  {
    field: "executionDate",
    renderHeader: () => (
      <Text sx={TEXT_SX} messageKey={TEXT_KEYS.EXECUTION_DATE} />
    ),
    renderCell: (params) => {
      return <DateText>{params.row.executionDate}</DateText>;
    },
    sortable: true,
    width: 200,
  },
  {
    field: "executedBy",
    width: 200,

    renderHeader: () => {
      return <Text sx={TEXT_SX} messageKey={TEXT_KEYS.EXECUTION_BY} />;
    },
    sortable: true,
    renderCell: (params) => {
      return <User executedBy={params.row.executedBy} />;
    },
  },
  {
    field: "resolution",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.RESULT} />,
    sortable: true,
    width: 150,
    renderCell: (params) => (
      <Text
        messageKey={params.row.resolution ? TEXT_KEYS.PASSED : TEXT_KEYS.FAILED}
      />
    ),
  },
  {
    field: "edit",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.ACTIONS} />,
    sortable: true,
    width: 150,

    renderCell: (params) => <ActionsCells params={params} />,
  },
];

const STYLE = {
  height: 400,
  width: 900,
};
function TestExecutionsGrid() {
  useLoadTestExecutionsOnMount(null, null);
  const testExecutions = useTestExecutions();

  const rows = useMemo(() => {
    return map(testExecutions, (testExecution) => ({
      id: testExecution._id,
      ...testExecution,
    }));
  }, [testExecutions]);

  return (
    <div style={STYLE}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}
const BoardsView: React.FC = () => {
  return (
    <Stack width='70vw' p={3} spacing={2}>
      <TestExecutionsGrid />
    </Stack>
  );
};
const Dashboard: React.FC = () => (
  <Stack direction='row' width='100vw' height='100vh' paddingTop='60px'>
    <BoardsView />
  </Stack>
);

export const TestExecutions: React.FC = () => {
  return <Dashboard />;
};

export const TestExecutionDetails: React.FC = () => {
  return (
    <Stack width='70vw' p={3}>
      <EditTestExecutionForm />
    </Stack>
  );
};
