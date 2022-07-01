import {
  ProjectsSelectField,
  VersionsSelectField,
} from "@monorepo/layout/src/SelectFields";
import { ROUTES } from "@monorepo/navigation/src/routes";
import { useGlobalProject, useGlobalVersion } from "@monorepo/store/src/global";
import { CreateTestExecutionPayload } from "@monorepo/store/src/services/TestExecutionService";
import {
  useLoading as useLoadingCreateTestExecution,
  useStart as useCreateTestExecution,
} from "@monorepo/store/src/test-execution/create";
import {
  useData as useTestExecution,
  useStart as useLoadTestExecutionByID,
} from "@monorepo/store/src/test-execution/get";
import { useStart as useLoadTestExecutions } from "@monorepo/store/src/test-execution/retrieve";
import { useLoading as useLoadingUpdateTestExecution } from "@monorepo/store/src/test-execution/update";
import { BasicText, Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Bdd } from "@monorepo/types";
import { Paper, Stack, useTheme } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo } from "react";
import { AiFillTool } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";
import {
  BddRendererContent,
  FeaturesSelectField,
} from "../test-case/NewTestCaseForm";

class NewTestExecutionFormData implements CreateTestExecutionPayload {
  name = "";
  description = "";
  projectId = "";
  featureId = "";
  versionsIds: string[] = [];
  bdd: Bdd = new Bdd();
  executedBy = "";
  executionDate = "";
  notes = "";
  resolution: boolean | null = null;

  static PATHS = {
    description: "description",
    name: "name",
    projectId: "projectId",
    featureId: "featureId",
    versionsIds: "versionsIds",
    bdd: "bdd",
  };
  constructor(params: Partial<NewTestExecutionFormData> = {}) {
    return {
      ...this,
      ...params,
    };
  }
}

const SCHEMA = yup.object().shape({
  [NewTestExecutionFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewTestExecutionFormData.PATHS.description]: yup
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
  const loadingCreateTestExecution = useLoadingCreateTestExecution();
  const isLoadingUpdateTestExecution = useLoadingUpdateTestExecution();
  return (
    <Stack spacing={2}>
      <Stack alignItems='center'>
        <AiFillTool />
      </Stack>
      <TextField
        id={NewTestExecutionFormData.PATHS.name}
        label={TEXT_KEYS.NAME}
      />
      <TextField
        id={NewTestExecutionFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={3}
      />
      <FeaturesSelectField id={NewTestExecutionFormData.PATHS.featureId} />
      <ProjectsSelectField
        id={NewTestExecutionFormData.PATHS.projectId}
        hideActions
      />
      <VersionsSelectField
        id={NewTestExecutionFormData.PATHS.versionsIds}
        multiple
        hideActions
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateTestExecution || isLoadingUpdateTestExecution}
      />
    </Stack>
  );
};

export const NewTestExecutionForm: React.FC = () => {
  const start = useCreateTestExecution();
  const navigate = useNavigate();
  const load = useLoadTestExecutions();
  const onSubmit = useCallback(
    (data: NewTestExecutionFormData) => {
      start(data, {
        onSuccess: () => {
          navigate(ROUTES.TEST_CASES);
          load(null);
        },
      });
    },
    [load, navigate, start]
  );
  const project = useGlobalProject();
  const version = useGlobalVersion();
  const initialValues = useMemo(() => {
    const values = new NewTestExecutionFormData();
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

function useLoadTestExecution() {
  const { id, testExecutionId } = useParams();
  const finalId = testExecutionId || id;
  const start = useLoadTestExecutionByID();
  useEffect(() => {
    if (finalId) {
      start({ id: finalId });
    }
  }, [finalId, start]);
}
export const EditTestExecutionForm: React.FC = () => {
  useLoadTestExecution();
  const testExecution = useTestExecution();
  const { palette } = useTheme();
  return (
    <Paper sx={PAPER_STYLE}>
      <Stack spacing={2}>
        {testExecution?.bdd.steps && (
          <BddRendererContent steps={testExecution?.bdd.steps} readOnly />
        )}
        <Stack>
          <Text messageKey={TEXT_KEYS.NOTES} variant='caption' />
          <BasicText>{testExecution?.notes}</BasicText>
        </Stack>
        <Stack
          p={1}
          width='auto'
          bgcolor={
            testExecution?.resolution
              ? palette.success.main
              : palette.error.main
          }
        >
          {testExecution?.resolution ? (
            <Text messageKey={TEXT_KEYS.PASSED} color='white' />
          ) : (
            <Text messageKey={TEXT_KEYS.FAILED} color='white' />
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};
