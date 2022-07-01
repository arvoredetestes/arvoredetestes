import {
  ProjectsSelectField,
  VersionsSelectField,
} from "@monorepo/layout/src/SelectFields";
import { ROUTES } from "@monorepo/navigation/src/routes";
import {
  useLoading as useLoadingCreateFeature,
  useStart as useCreateFeature,
} from "@monorepo/store/src/feature/create";
import {
  useData as useFeature,
  useStart as useLoadFeatureByID,
} from "@monorepo/store/src/feature/get";
import { useStart as useLoadFeatures } from "@monorepo/store/src/feature/retrieve";
import {
  useLoading as useLoadingUpdateFeature,
  useStart as useStartUpdateFeature,
} from "@monorepo/store/src/feature/update";
import { useGlobalProject, useGlobalVersion } from "@monorepo/store/src/global";
import { CreateFeaturePayload } from "@monorepo/store/src/services/FeatureService";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AiFillTool } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class NewFeatureFormData implements CreateFeaturePayload {
  name = "";
  description = "";
  projectId = "";
  versionsIds: string[] = [];

  static PATHS = {
    description: "description",
    name: "name",
    projectId: "projectId",
    versionsIds: "versionsIds",
  };
}

const SCHEMA = yup.object().shape({
  [NewFeatureFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewFeatureFormData.PATHS.description]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
});

const PAPER_STYLE = {
  padding: 5,
  width: 800,
  margin: "0 auto",
};

interface FormFieldsProps {
  id?: string;
}
const FormFields = ({ id }: FormFieldsProps) => {
  const loadingCreateFeature = useLoadingCreateFeature();
  const isLoadingUpdateFeature = useLoadingUpdateFeature();
  return (
    <Stack spacing={2}>
      <Stack alignItems='center'>
        <AiFillTool />
      </Stack>
      <TextField id={NewFeatureFormData.PATHS.name} label={TEXT_KEYS.NAME} />{" "}
      <TextField
        id={NewFeatureFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={3}
      />
      <ProjectsSelectField
        id={NewFeatureFormData.PATHS.projectId}
        hideActions
      />
      <VersionsSelectField
        id={NewFeatureFormData.PATHS.versionsIds}
        multiple
        hideActions
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateFeature || isLoadingUpdateFeature}
      />
    </Stack>
  );
};

export const NewFeatureForm: React.FC = () => {
  const start = useCreateFeature();
  const navigate = useNavigate();
  const load = useLoadFeatures();
  const onSubmit = useCallback(
    (data: NewFeatureFormData) => {
      start(data, {
        onSuccess: () => {
          navigate(ROUTES.FEATURES);
          load(null);
        },
      });
    },
    [load, navigate, start]
  );
  const project = useGlobalProject();
  const version = useGlobalVersion();
  const initialValues = useMemo(() => {
    const values = new NewFeatureFormData();
    if (project) {
      values.projectId = project._id;
    }
    if (version) {
      values.versionsIds = [version._id];
    }

    return values;
  }, [project, version]);
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SCHEMA}
      >
        <FormFields />
      </Formik>
    </Paper>
  );
};

function useLoadFeature() {
  const { id } = useParams();
  const ref = useRef(false);
  const start = useLoadFeatureByID();
  useEffect(() => {
    if (id && !ref.current) {
      start({ id });
      ref.current = true;
    }
  }, [id, start]);
}
export const EditFeatureForm: React.FC = () => {
  useLoadFeature();
  const feature = useFeature();
  const initialValues = useMemo(() => {
    const values = new NewFeatureFormData();
    if (feature) {
      values.description = feature.description;
      values.name = feature.name;
      values.projectId = feature.projectId;
      values.versionsIds = feature.versionsIds;
    }

    return values;
  }, [feature]);

  const start = useStartUpdateFeature();
  const navigate = useNavigate();
  const { id } = useParams();
  const load = useLoadFeatures();
  const onSubmit = useCallback(
    (data: NewFeatureFormData) => {
      if (id) {
        start(
          { ...data, id },
          {
            onSuccess: () => {
              navigate(ROUTES.FEATURES);
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
