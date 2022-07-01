import {
  EditMemberForm,
  NewMemberForm,
} from "@monorepo/forms/src/team/NewMemberForm";
import { Button } from "@monorepo/layout/src/Button";
import { useStart } from "@monorepo/store/src/user/delete-user";
import { useIsAdmin, useLogout } from "@monorepo/store/src/user/login";
import {
  useData,
  useLoading,
  useStartOnMount,
} from "@monorepo/store/src/user/me";
import {
  useData as useUsers,
  useStart as useLoadUsers,
  useStartOnMount as useLoadUsersOnMount,
} from "@monorepo/store/src/user/users";
import { BasicText, Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Card, CardActions, CardContent, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
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
  const deleteUser = useStart();
  const loadUsers = useLoadUsers();
  const me = useData();
  const onClick = useCallback(() => {
    deleteUser({ id: params.id }, { onSuccess: () => loadUsers(null, null) });
  }, [deleteUser, loadUsers, params.id]);
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;
  return (
    <Stack direction='row' spacing={2}>
      <Link to={ROUTES.getTeamMemberRoute(params.id as string)}>
        <FiEdit />
      </Link>
      {me?._id !== params.id && (
        <a onClick={onClick}>
          <FiTrash />
        </a>
      )}
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
    field: "role",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.ROLE} />,

    width: 110,
    sortable: true,
  },
  {
    field: "email",
    renderHeader: () => <Text sx={TEXT_SX} messageKey={TEXT_KEYS.EMAIL} />,
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
function UsersGrid() {
  useLoadUsersOnMount(null, null);
  const users = useUsers();

  const rows = useMemo(() => {
    return map(users, (user) => ({
      id: user._id,
      ...user,
    }));
  }, [users]);

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

const AddUserButton = () => {
  const isAdmin = useIsAdmin();
  if (!isAdmin) return null;

  return (
    <Stack justifyContent='flex-start'>
      <Link to={ROUTES.TEAM_NEW_MEMBER}>
        <Button messageKey={TEXT_KEYS.ADD_USER} endIcon={<IoAdd />} />
      </Link>
    </Stack>
  );
};
export const Team: React.FC = () => {
  useStartOnMount(null, null);
  return (
    <Stack
      height='100vh'
      alignItems='center'
      justifyContent='center'
      spacing={2}
    >
      <UsersGrid />
      <AddUserButton />
    </Stack>
  );
};

export const TeamNewMember: React.FC = () => {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <NewMemberForm />
    </Stack>
  );
};

export const TeamEditMember: React.FC = () => {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <EditMemberForm />
    </Stack>
  );
};

export const TeamMember: React.FC = () => {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <EditMemberForm />
    </Stack>
  );
};

const MemberCard: React.FC = () => {
  const me = useData();
  const isLoading = useLoading();
  const logout = useLogout();
  if (isLoading) return <BasicText>...</BasicText>;
  if (!me) return null;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack spacing={2}>
          <BasicText>{me.name}</BasicText>
          <BasicText>{me.email}</BasicText>
          <BasicText>{me.role}</BasicText>
        </Stack>
      </CardContent>
      <CardActions>
        <Stack justifyContent='space-between' direction='row' width='100%'>
          <Link to={ROUTES.getTeamMemberEditRoute(me._id as unknown as string)}>
            <Button messageKey={TEXT_KEYS.EDIT} />
          </Link>
          <Button messageKey={TEXT_KEYS.LOGOUT} onClick={logout} />
        </Stack>
      </CardActions>
    </Card>
  );
};
export const TeamMe: React.FC = () => {
  return (
    <Stack height='100vh' alignItems='center' justifyContent='center'>
      <MemberCard />
    </Stack>
  );
};
