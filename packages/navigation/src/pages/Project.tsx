import {
  EditProjectForm,
  NewProjectForm,
} from "@monorepo/forms/src/project/NewProjectForm";
import { useStart } from "@monorepo/store/src/project/delete";
import {
  useData as useProjects,
  useStart as useLoadProjects,
  useStartOnMount as useLoadProjectsOnMount,
} from "@monorepo/store/src/project/retrieve";
import { useIsAdmin } from "@monorepo/store/src/user/login";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
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
  const deleteProject = useStart();
  const loadProjects = useLoadProjects();
  const onClick = useCallback(() => {
    deleteProject(
      { id: params.id },
      { onSuccess: () => loadProjects(null, null) }
    );
  }, [deleteProject, loadProjects, params.id]);
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <Stack direction='row' spacing={2}>
      <Link to={ROUTES.getEditProjectRoute(params.id as string)}>
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
    width: 150,
    sortable: true,
  },
  {
    field: "description",
    renderHeader: () => (
      <Text sx={TEXT_SX} messageKey={TEXT_KEYS.DESCRIPTION} />
    ),

    width: 550,
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
function ProjectsGrid() {
  useLoadProjectsOnMount(null, null);
  const projects = useProjects();

  const rows = useMemo(() => {
    return map(projects, (project) => ({
      id: project._id,
      ...project,
    }));
  }, [projects]);

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
  const createNewProject = params.new === "true";
  return (
    <Stack width='70vw' p={3}>
      {createNewProject ? <NewProjectForm /> : <ProjectsGrid />}
    </Stack>
  );
};
const Dashboard: React.FC = () => (
  <Stack direction='row' width='100vw' height='100vh' paddingTop='60px'>
    <BoardsView />
  </Stack>
);

export const Project: React.FC = () => {
  return <Dashboard />;
};

export const EditProject: React.FC = () => {
  return (
    <Stack width='70vw' p={3}>
      <EditProjectForm />
    </Stack>
  );
};
