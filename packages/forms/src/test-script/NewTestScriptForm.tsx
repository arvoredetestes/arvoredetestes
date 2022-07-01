import { Button } from "@monorepo/layout";
import {
  ProjectsSelectField,
  VersionsSelectField,
} from "@monorepo/layout/src/SelectFields";
import { ROUTES } from "@monorepo/navigation/src/routes";
import { useGlobalProject, useGlobalVersion } from "@monorepo/store/src/global";
import { CreateTestScriptPayload } from "@monorepo/store/src/services/TestScriptService";
import {
  useData as useTestCases,
  useStartOnMount as useLoadTestCasesOnMount,
} from "@monorepo/store/src/test-case/retrieve";
import {
  useLoading as useLoadingCreateTestScript,
  useStart as useCreateTestScript,
} from "@monorepo/store/src/test-script/create";
import {
  useData as useTestScript,
  useStart as useLoadTestScriptByID,
} from "@monorepo/store/src/test-script/get";
import { useStart as useLoadTestScripts } from "@monorepo/store/src/test-script/retrieve";
import {
  useLoading as useLoadingUpdateTestScript,
  useStart as useStartUpdateTestScript,
} from "@monorepo/store/src/test-script/update";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import map from "lodash/map";
import React, { useCallback, useEffect, useMemo } from "react";
import { AiFillTool } from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SelectField } from "../inputs/SelectField";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";
import {
  ExecuteTestCaseForm,
  FeaturesSelectField,
} from "../test-case/NewTestCaseForm";

class NewTestScriptFormData implements CreateTestScriptPayload {
  name = "";
  description = "";
  featureId = "";
  projectId = "";
  versionsIds: string[] = [];
  testCasesIds: string[] = [];

  static PATHS = {
    description: "description",
    name: "name",
    projectId: "projectId",
    versionsIds: "versionsIds",
    featureId: "featureId",
    testCasesIds: "testCasesIds",
  };
  constructor(params: Partial<NewTestScriptFormData> = {}) {
    return {
      ...this,
      ...params,
    };
  }
}

const SCHEMA = yup.object().shape({
  [NewTestScriptFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewTestScriptFormData.PATHS.description]: yup
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
  featureId?: string;
}

const TestCasesSelectField = () => {
  useLoadTestCasesOnMount(null, null);
  const testCases = useTestCases();
  const options = useMemo(
    () =>
      map(testCases, (tc) => ({
        name: tc.name,
        value: tc._id,
      })),
    [testCases]
  );
  return (
    <SelectField
      label={TEXT_KEYS.TEST_CASES}
      id={NewTestScriptFormData.PATHS.testCasesIds}
      options={options}
      multiple
    />
  );
};
const FormFields = ({ id, featureId }: FormFieldsProps) => {
  const loadingCreateTestScript = useLoadingCreateTestScript();
  const isLoadingUpdateTestScript = useLoadingUpdateTestScript();
  return (
    <Stack spacing={2}>
      {featureId && id && (
        <Link to={ROUTES.getExecuteTestScriptRoute(featureId, id)}>
          <Button
            messageKey={TEXT_KEYS.EXECUTE}
            fullWidth
            endIcon={<IoPlay />}
          />
        </Link>
      )}
      <Stack alignItems='center'>
        <AiFillTool />
      </Stack>
      <TextField id={NewTestScriptFormData.PATHS.name} label={TEXT_KEYS.NAME} />
      <TextField
        id={NewTestScriptFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={3}
      />
      <FeaturesSelectField id={NewTestScriptFormData.PATHS.featureId} />
      <TestCasesSelectField />
      <ProjectsSelectField
        id={NewTestScriptFormData.PATHS.projectId}
        hideActions
      />
      <VersionsSelectField
        id={NewTestScriptFormData.PATHS.testCasesIds}
        multiple
        hideActions
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateTestScript || isLoadingUpdateTestScript}
      />
    </Stack>
  );
};

export const NewTestScriptForm: React.FC = () => {
  const start = useCreateTestScript();
  const navigate = useNavigate();
  const load = useLoadTestScripts();
  const onSubmit = useCallback(
    (data: NewTestScriptFormData) => {
      start(data, {
        onSuccess: () => {
          navigate(ROUTES.TEST_SCRIPTS);
          load(null);
        },
      });
    },
    [load, navigate, start]
  );
  const project = useGlobalProject();
  const version = useGlobalVersion();
  const initialValues = useMemo(() => {
    const values = new NewTestScriptFormData();
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
        enableReinitialize
      >
        <FormFields />
      </Formik>
    </Paper>
  );
};

function useLoadTestScript() {
  const { id, testScriptId } = useParams();
  const finalId = testScriptId || id;

  const start = useLoadTestScriptByID();
  useEffect(() => {
    if (finalId) {
      start({ id: finalId });
    }
  }, [finalId, start]);
}
export const EditTestScriptForm: React.FC = () => {
  useLoadTestScript();
  const testScript = useTestScript();
  const initialValues = useMemo(() => {
    return new NewTestScriptFormData(testScript || {});
  }, [testScript]);

  const start = useStartUpdateTestScript();
  const navigate = useNavigate();
  const { id, testScriptId } = useParams();
  const load = useLoadTestScripts();
  const onSubmit = useCallback(
    (data: NewTestScriptFormData) => {
      if (id) {
        start(
          { ...data, id },
          {
            onSuccess: () => {
              navigate(ROUTES.TEST_SCRIPTS);
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
        <FormFields id={testScriptId} featureId={id} />
      </Formik>
    </Paper>
  );
};

export const ExecuteTestScriptForm: React.FC = () => {
  const data = useTestScript();
  return (
    <Stack spacing={2} alignItems='center'>
      {map(data?.testCasesIds, (id) => (
        // @ts-ignore
        <ExecuteTestCaseForm testCaseIdParam={id} key={id} />
      ))}
    </Stack>
  );
};
