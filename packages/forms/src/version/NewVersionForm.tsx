import { ROUTES } from "@monorepo/navigation/src/routes";
import {
  useLoading as useLoadingCreateVersion,
  useStart as useCreateVersion,
} from "@monorepo/store/src/version/create";
import {
  useData as useVersion,
  useStart as useLoadVersionByID,
} from "@monorepo/store/src/version/get";
import { useStart as useLoadVersions } from "@monorepo/store/src/version/retrieve";
import {
  useLoading as useLoadingUpdateVersion,
  useStart as useStartUpdateVersion,
} from "@monorepo/store/src/version/update";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AiFillCode } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class NewVersionFormData {
  description = "";
  name = "";
  projectId = "projectId";

  static PATHS = {
    description: "description",
    name: "name",
    projectId: "projectId",
  };
}

const SCHEMA = yup.object().shape({
  [NewVersionFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewVersionFormData.PATHS.description]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
});

const INITIAL_VALUES = new NewVersionFormData();

const PAPER_STYLE = {
  padding: 5,
  width: 800,
  margin: "0 auto",
};

interface FormFieldsProps {
  id?: string;
}
const FormFields = ({ id }: FormFieldsProps) => {
  const loadingCreateVersion = useLoadingCreateVersion();
  const isLoadingUpdateVersion = useLoadingUpdateVersion();
  return (
    <Stack spacing={2}>
      <Stack alignItems='center'>
        <AiFillCode />
      </Stack>
      <TextField id={NewVersionFormData.PATHS.name} label={TEXT_KEYS.NAME} />{" "}
      <TextField
        id={NewVersionFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={3}
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateVersion || isLoadingUpdateVersion}
      />
    </Stack>
  );
};

export const NewVersionForm: React.FC = () => {
  const start = useCreateVersion();
  const navigate = useNavigate();
  const load = useLoadVersions();

  const onSubmit = useCallback(
    (data: NewVersionFormData) => {
      start(data, {
        onSuccess: () => {
          navigate(ROUTES.VERSION);
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

function useLoadVersion() {
  const { id } = useParams();
  const ref = useRef(false);
  const start = useLoadVersionByID();
  useEffect(() => {
    if (id && !ref.current) {
      start({ id });
      ref.current = true;
    }
  }, [id, start]);
}
export const EditVersionForm: React.FC = () => {
  useLoadVersion();
  const version = useVersion();
  const initialValues = useMemo(() => {
    const values = new NewVersionFormData();
    if (version) {
      values.description = version.description;
      values.name = version.name;
      // values.password = user.password;
      // values.confirmPassword = user.confirmPassword;
    }

    return values;
  }, [version]);

  const start = useStartUpdateVersion();
  const navigate = useNavigate();
  const { id } = useParams();
  const load = useLoadVersions();
  const onSubmit = useCallback(
    (data: NewVersionFormData) => {
      if (id) {
        start(
          { ...data, id },
          {
            onSuccess: () => {
              navigate(ROUTES.VERSION);
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
