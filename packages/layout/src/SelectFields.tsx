import { SelectField } from "@monorepo/forms/src/inputs/SelectField";
import { ROUTES } from "@monorepo/navigation/src/routes";
import {
  useGlobalProject,
  useGlobalVersion,
  useSetGlobalProject,
  useSetGlobalVersion,
} from "@monorepo/store/src/global";
import { useData, useStartOnMount } from "@monorepo/store/src/project/retrieve";
import { useIsAdmin } from "@monorepo/store/src/user/login";
import {
  useData as useVersions,
  useStartOnMount as useLoadVersionsOnMount,
} from "@monorepo/store/src/version/retrieve";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { SelectProps } from "@mui/material/Select";
import { Formik } from "formik";
import find from "lodash/find";
import map from "lodash/map";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

class ProjectSelectorData {
  project: string | null = "";

  static PATHS = {
    project: "project",
  };
}

function useProjectsOptions(
  { hideActions }: { hideActions: boolean } = { hideActions: false }
) {
  const data = useData();
  const isAdmin = useIsAdmin();
  return useMemo(() => {
    const adminActions = isAdmin
      ? [
          {
            name: <Text messageKey={TEXT_KEYS.CREATE} variant='caption' />,
            value: 0,
          },
        ]
      : [];
    const actions = hideActions
      ? []
      : [
          ...adminActions,
          {
            name: <Text messageKey={TEXT_KEYS.SEE_ALL} variant='caption' />,
            value: 1,
          },
        ];
    return [
      ...actions,
      ...map(data, (item) => ({
        name: item.name,
        value: item._id,
      })),
    ];
  }, [data, hideActions, isAdmin]);
}

interface ProjectsSelectFields {
  id: string;
  submitOnChange?: boolean;
  hideActions?: boolean;
}
export const ProjectsSelectField: React.FC<ProjectsSelectFields & SelectProps> =
  ({ id, submitOnChange, hideActions, ...rest }: ProjectsSelectFields) => {
    const options = useProjectsOptions({ hideActions: hideActions || false });
    return (
      <SelectField
        options={options}
        id={id}
        label={TEXT_KEYS.PROJECT}
        submitOnChange={submitOnChange}
        {...rest}
      />
    );
  };
export const ProjectSelector: React.FC = () => {
  useStartOnMount(null, null);
  const globalProject = useGlobalProject();
  const setGlobalProject = useSetGlobalProject();
  const navigate = useNavigate();
  const projects = useData();
  const onSubmit = useCallback(
    (data: ProjectSelectorData) => {
      // @ts-ignore
      if (data.project === 0) {
        navigate(`${ROUTES.PROJECT}?new=true`);
        // @ts-ignore
      } else if (data.project === 1) {
        navigate(ROUTES.PROJECT);
      } else {
        // @ts-ignore
        setGlobalProject(find(projects, { _id: data.project }), null);
      }
    },
    [navigate, projects, setGlobalProject]
  );

  const initialValues = useMemo(() => {
    const INITIAL_VALUES = new ProjectSelectorData();
    if (globalProject) INITIAL_VALUES.project = globalProject._id;
    return INITIAL_VALUES;
  }, [globalProject]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <ProjectsSelectField
        id={ProjectSelectorData.PATHS.project}
        submitOnChange
      />
    </Formik>
  );
};

class VersionSelectorData {
  version: string | null = "";

  static PATHS = {
    version: "version",
  };
}

function useVersionsOptions(
  { hideActions }: { hideActions: boolean } = { hideActions: false }
) {
  const data = useVersions();
  const isAdmin = useIsAdmin();

  return useMemo(() => {
    const adminActions = isAdmin
      ? [
          {
            name: <Text messageKey={TEXT_KEYS.CREATE} variant='caption' />,
            value: 0,
          },
        ]
      : [];
    const actions = hideActions
      ? []
      : [
          ...adminActions,
          {
            name: <Text messageKey={TEXT_KEYS.SEE_ALL} variant='caption' />,
            value: 1,
          },
        ];
    return [
      ...actions,
      ...map(data, (item) => ({
        name: item.name,
        value: item._id,
      })),
    ];
  }, [data, hideActions, isAdmin]);
}

export const VersionsSelectField: React.FC<ProjectsSelectFields & SelectProps> =
  ({ id, submitOnChange, hideActions, ...rest }: ProjectsSelectFields) => {
    const options = useVersionsOptions({ hideActions: hideActions || false });
    return (
      <SelectField
        options={options}
        id={id}
        label={TEXT_KEYS.VERSION}
        submitOnChange={submitOnChange}
        {...rest}
      />
    );
  };

export const VersionSelector: React.FC = () => {
  useLoadVersionsOnMount(null, null);
  const globalVersion = useGlobalVersion();
  const setGlobalVersion = useSetGlobalVersion();
  const versions = useVersions();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: VersionSelectorData) => {
      // @ts-ignore
      if (data.version === 0) {
        navigate(`${ROUTES.VERSION}?new=true`);
        // @ts-ignore
      } else if (data.version === 1) {
        navigate(ROUTES.VERSION);
      } else {
        // @ts-ignore
        setGlobalVersion(find(versions, { _id: data.version }), null);
      }
    },
    [navigate, setGlobalVersion, versions]
  );

  const initialValues = useMemo(() => {
    const INITIAL_VALUES = new VersionSelectorData();
    if (globalVersion) INITIAL_VALUES.version = globalVersion._id;
    return INITIAL_VALUES;
  }, [globalVersion]);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <VersionsSelectField
        id={VersionSelectorData.PATHS.version}
        submitOnChange
      />
    </Formik>
  );
};
