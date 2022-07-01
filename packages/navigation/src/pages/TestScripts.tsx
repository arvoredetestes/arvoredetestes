import {
  EditTestScriptForm,
  ExecuteTestScriptForm,
  NewTestScriptForm,
} from "@monorepo/forms/src/test-script/NewTestScriptForm";
import { Button } from "@monorepo/layout";
import { useStart } from "@monorepo/store/src/test-script/delete";
import {
  useData as useTestScripts,
  useStart as useLoadTestScripts,
  useStartOnMount as useLoadTestScriptsOnMount,
} from "@monorepo/store/src/test-script/retrieve";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
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
  const deleteTestScript = useStart();
  const loadTestScripts = useLoadTestScripts();
  const onClick = useCallback(() => {
    deleteTestScript(
      { id: params.id },
      { onSuccess: () => loadTestScripts(null, null) }
    );
  }, [deleteTestScript, loadTestScripts, params.id]);
  return (
    <Stack direction='row' spacing={2}>
      <Link to={ROUTES.getTestScriptDetailsRoute(params.id as string)}>
        <FiEdit />
      </Link>
      <a onClick={onClick}>
        <FiTrash />
      </a>
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
function TestScriptsGrid() {
  useLoadTestScriptsOnMount(null, null);
  const testScripts = useTestScripts();

  const rows = useMemo(() => {
    return map(testScripts, (testScript) => ({
      id: testScript._id,
      ...testScript,
    }));
  }, [testScripts]);

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
  const createNewTestScript = params.new === "true";
  return (
    <Stack width='70vw' p={3} spacing={2}>
      <Stack>
        {!createNewTestScript && (
          <Link to={ROUTES.NEW_TEST_SCRIPT}>
            <Button
              messageKey={TEXT_KEYS.CREATE_TEST_SCRIPT}
              endIcon={<IoAdd />}
            />
          </Link>
        )}
      </Stack>
      {createNewTestScript ? <NewTestScriptForm /> : <TestScriptsGrid />}
    </Stack>
  );
};
const Dashboard: React.FC = () => (
  <Stack direction='row' width='100vw' height='100vh' paddingTop='60px'>
    <BoardsView />
  </Stack>
);

export const TestScripts: React.FC = () => {
  return <Dashboard />;
};

export const TestScriptDetails: React.FC = () => {
  const params = useQueryParams();
  const execute = params.execute === "true";
  return (
    <Stack width='70vw' p={3}>
      {execute ? <ExecuteTestScriptForm /> : <EditTestScriptForm />}
    </Stack>
  );
};
