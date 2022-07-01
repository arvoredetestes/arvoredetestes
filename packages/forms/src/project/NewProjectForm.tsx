import { ROUTES } from "@monorepo/navigation/src/routes";
import {
  useLoading as useLoadingCreateProject,
  useStart as useCreateProject,
} from "@monorepo/store/src/project/create";
import {
  useData as useProject,
  useStart as useLoadProjectByID,
} from "@monorepo/store/src/project/get";
import { useStart as useLoadProjects } from "@monorepo/store/src/project/retrieve";
import {
  useLoading as useLoadingUpdateProject,
  useStart as useStartUpdateProject,
} from "@monorepo/store/src/project/update";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AiFillProject } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class NewProjectFormData {
  description = "";
  name = "";

  static PATHS = {
    description: "description",
    name: "name",
  };
}

const SCHEMA = yup.object().shape({
  [NewProjectFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewProjectFormData.PATHS.description]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
});

const INITIAL_VALUES = new NewProjectFormData();

const PAPER_STYLE = {
  padding: 5,
  width: 800,
  margin: "0 auto",
};

interface FormFieldsProps {
  id?: string;
}
const FormFields = ({ id }: FormFieldsProps) => {
  const loadingCreateProject = useLoadingCreateProject();
  const isLoadingUpdateProject = useLoadingUpdateProject();
  return (
    <Stack spacing={2}>
      <Stack alignItems='center'>
        <AiFillProject />
      </Stack>
      <TextField id={NewProjectFormData.PATHS.name} label={TEXT_KEYS.NAME} />{" "}
      <TextField
        id={NewProjectFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={3}
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateProject || isLoadingUpdateProject}
      />
    </Stack>
  );
};

export const NewProjectForm: React.FC = () => {
  const start = useCreateProject();
  const navigate = useNavigate();
  const load = useLoadProjects();

  const onSubmit = useCallback(
    (data: NewProjectFormData) => {
      start(data, {
        onSuccess: () => {
          navigate(ROUTES.PROJECT);
          load(null);
        },
      });
    },
    [load, navigate, start]
  );
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={SCHEMA}
      >
        <FormFields />
      </Formik>
    </Paper>
  );
};

function useLoadProject() {
  const { id } = useParams();
  const ref = useRef(false);
  const start = useLoadProjectByID();
  useEffect(() => {
    if (id && !ref.current) {
      start({ id });
      ref.current = true;
    }
  }, [id, start]);
}
export const EditProjectForm: React.FC = () => {
  useLoadProject();
  const project = useProject();
  const initialValues = useMemo(() => {
    const values = new NewProjectFormData();
    if (project) {
      values.description = project.description;
      values.name = project.name;
      // values.password = user.password;
      // values.confirmPassword = user.confirmPassword;
    }

    return values;
  }, [project]);

  const start = useStartUpdateProject();
  const navigate = useNavigate();
  const { id } = useParams();
  const load = useLoadProjects();
  const onSubmit = useCallback(
    (data: NewProjectFormData) => {
      if (id) {
        start(
          { ...data, id },
          {
            onSuccess: () => {
              navigate(ROUTES.PROJECT);
              load(null);
            },
          }
        );
      }
    },
    [id, load, navigate, start]
  );
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SCHEMA}
        enableReinitialize
      >
        <FormFields id={id} />
      </Formik>
    </Paper>
  );
};
