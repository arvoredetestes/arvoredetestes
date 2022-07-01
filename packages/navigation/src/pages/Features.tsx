import {
  EditFeatureForm,
  NewFeatureForm,
} from "@monorepo/forms/src/feature/NewFeatureForm";
import { Button } from "@monorepo/layout";
import { useStart } from "@monorepo/store/src/feature/delete";
import {
  useData as useFeatures,
  useStart as useLoadFeatures,
  useStartOnMount as useLoadFeaturesOnMount,
} from "@monorepo/store/src/feature/retrieve";
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
  const deleteFeature = useStart();
  const loadFeatures = useLoadFeatures();
  const onClick = useCallback(() => {
    deleteFeature(
      { id: params.id },
      { onSuccess: () => loadFeatures(null, null) }
    );
  }, [deleteFeature, loadFeatures, params.id]);
  return (
    <Stack direction='row' spacing={2}>
      <Link to={ROUTES.getFeatureDetailRoute(params.id as string)}>
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
function FeaturesGrid() {
  useLoadFeaturesOnMount(null, null);
  const features = useFeatures();

  const rows = useMemo(() => {
    return map(features, (feature) => ({
      id: feature._id,
      ...feature,
    }));
  }, [features]);

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
  const createNewFeature = params.new === "true";
  return (
    <Stack width='70vw' p={3} spacing={2}>
      <Stack>
        {!createNewFeature && (
          <Link to={ROUTES.NEW_FEATURE}>
            <Button messageKey={TEXT_KEYS.CREATE_FEATURE} endIcon={<IoAdd />} />
          </Link>
        )}
      </Stack>
      {createNewFeature ? <NewFeatureForm /> : <FeaturesGrid />}
    </Stack>
  );
};
const Dashboard: React.FC = () => (
  <Stack direction='row' width='100vw' height='100vh' paddingTop='60px'>
    <BoardsView />
  </Stack>
);

export const Features: React.FC = () => {
  return <Dashboard />;
};

export const FeatureDetails: React.FC = () => {
  return (
    <Stack width='70vw' p={3}>
      <EditFeatureForm />
    </Stack>
  );
};
