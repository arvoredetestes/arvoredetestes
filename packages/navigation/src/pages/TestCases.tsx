import {
  EditTestCaseForm,
  ExecuteTestCaseForm,
  NewTestCaseForm,
} from "@monorepo/forms/src/test-case/NewTestCaseForm";
import { Button } from "@monorepo/layout";
import { useStart } from "@monorepo/store/src/test-case/delete";
import {
  useData as useTestCases,
  useStart as useLoadTestCases,
  useStartOnMount as useLoadTestCasesOnMount,
} from "@monorepo/store/src/test-case/retrieve";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
import { BsPlayFill } from "react-icons/bs";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";

import { useQueryParams } from "../hooks";
import { ROUTES } from "../routes";

const TEXT_SX = {
  textTransform: "uppercase",
  fontWeight: "bold",
};

interface ActionsCells {
  params: Record<string, any>;
}
const ActionsCells: React.FC<ActionsCells> = ({ params }: ActionsCells) => {
  const deleteTestCase = useStart();
  const loadTestCases = useLoadTestCases();
  const onClick = useCallback(() => {
    deleteTestCase(
      { id: params.id },
      { onSuccess: () => loadTestCases(null, null) }
    );
  }, [deleteTestCase, loadTestCases, params.id]);

  return (
    <Stack direction='row' spacing={2}>
      <Link
        to={ROUTES.getFeatureTestCaseRoute(
          params.row.featureId,
          params.id as string
        )}
      >
        <FiEdit />
      </Link>
      <a onClick={onClick}>
        <FiTrash />
      </a>
      <Link
        to={ROUTES.getExecuteTestCaseRoute(
          params.row.featureId,
          params.id as string
        )}
      >
        <BsPlayFill />
      </Link>
    </Stack>
  );
};
const columns: GridColDef[] = [
  {
    field: "name",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.NAME} />,
    width: 300,
    sortable: true,
  },
  {
    field: "description",
    renderHeader: () => (
      <Text sx={TEXT_SX} messageKey={TEXT_KEYS.DESCRIPTION} />
    ),

    width: 250,
    sortable: true,
  },
  {
    field: "edit",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.ACTIONS} />,
    width: 160,
    sortable: true,
    renderCell: (params) => <ActionsCells params={params} />,
  },
];

const STYLE = {
  height: 400,
  width: 900,
};
function TestCasesGrid() {
  useLoadTestCasesOnMount(null, null);
  const testCases = useTestCases();

  const rows = useMemo(() => {
    return map(testCases, (testCase) => ({
      id: testCase._id,
      ...testCase,
    }));
  }, [testCases]);

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
  const params = useQueryParams();
  const createNewTestCase = params.new === "true";
  return (
    <Stack width='70vw' p={3} spacing={2}>
      <Stack>
        {!createNewTestCase && (
          <Link to={ROUTES.NEW_TEST_CASE}>
            <Button
              messageKey={TEXT_KEYS.CREATE_TEST_CASE}
              endIcon={<IoAdd />}
            />
          </Link>
        )}
      </Stack>
      {createNewTestCase ? <NewTestCaseForm /> : <TestCasesGrid />}
    </Stack>
  );
};
const Dashboard: React.FC = () => (
  <Stack direction='row' height='100vh' paddingTop='60px'>
    <BoardsView />
  </Stack>
);

export const TestCases: React.FC = () => {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <Dashboard />
    </Stack>
  );
};

export const TestCaseDetails: React.FC = () => {
  const params = useQueryParams();
  const execute = params.execute === "true";
  return (
    <Stack width='70vw' p={3}>
      {execute ? <ExecuteTestCaseForm /> : <EditTestCaseForm />}
    </Stack>
  );
};
