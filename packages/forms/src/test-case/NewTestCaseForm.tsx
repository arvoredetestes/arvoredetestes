import { Button } from "@monorepo/layout";
import {
  ProjectsSelectField,
  VersionsSelectField,
} from "@monorepo/layout/src/SelectFields";
import { ROUTES } from "@monorepo/navigation/src/routes";
import {
  useData as useFeatures,
  useStartOnMount as useLoadFeaturesOnMount,
} from "@monorepo/store/src/feature/retrieve";
import { useGlobalProject, useGlobalVersion } from "@monorepo/store/src/global";
import { useReloadEverything } from "@monorepo/store/src/integration/hooks";
import { CreateTestCasePayload } from "@monorepo/store/src/services/TestCaseService";
import { CreateTestExecutionPayload } from "@monorepo/store/src/services/TestExecutionService";
import {
  useLoading as useLoadingCreateTestCase,
  useStart as useCreateTestCase,
} from "@monorepo/store/src/test-case/create";
import {
  useData as useTestCase,
  useStart as useLoadTestCaseByID,
} from "@monorepo/store/src/test-case/get";
import {
  useData as useTestCases,
  useStart as useLoadTestCases,
} from "@monorepo/store/src/test-case/retrieve";
import {
  useLoading as useLoadingUpdateTestCase,
  useStart as useStartUpdateTestCase,
} from "@monorepo/store/src/test-case/update";
import {
  useLoading as useLoadingCreateTestExecution,
  useStart as useStartCreateTestExecution,
} from "@monorepo/store/src/test-execution/create";
import { useData, useStartOnMount } from "@monorepo/store/src/user/me";
import { MessageKeys } from "@monorepo/texts";
import { BasicText, Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Bdd, BDDOperator, BddStep } from "@monorepo/types";
import { ButtonGroup, IconButton, Paper, Stack, useTheme } from "@mui/material";
import dayjs from "dayjs";
import { Formik, useField, useFormikContext } from "formik";
import hash_sum from "hash-sum";
import { filter, keys, size } from "lodash";
import find from "lodash/find";
import map from "lodash/map";
import { nanoid } from "nanoid";
import React, { memo, useCallback, useMemo } from "react";
import {
  AiFillDelete,
  AiFillTool,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { IoPlay } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeepCompareEffect, useDeepCompareMemo } from "use-deep-compare";
import * as yup from "yup";

import { SelectField } from "../inputs/SelectField";
import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class NewTestCaseFormData implements CreateTestCasePayload {
  name = "";
  description = "";
  projectId = "";
  featureId = "";
  versionsIds: string[] = [];
  bdd: Bdd = new Bdd();

  static PATHS = {
    description: "description",
    name: "name",
    projectId: "projectId",
    featureId: "featureId",
    versionsIds: "versionsIds",
    bdd: "bdd",
  };

  constructor(params: Partial<NewTestCaseFormData> = {}) {
    return { ...this, ...params };
  }
}

const SCHEMA = yup.object().shape({
  [NewTestCaseFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewTestCaseFormData.PATHS.description]: yup
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
  edit?: boolean;
}

interface FeaturesSelectFieldProps {
  id: string;
}
export const FeaturesSelectField: React.FC<FeaturesSelectFieldProps> = ({
  id,
}: FeaturesSelectFieldProps) => {
  useLoadFeaturesOnMount(null, null);
  const features = useFeatures();
  const options = useMemo(() => {
    return map(features, (ft) => ({ value: ft._id, name: ft.name }));
  }, [features]);
  return <SelectField label={TEXT_KEYS.FEATURE} id={id} options={options} />;
};

interface OperatorsSelectFieldProps {
  id: string;
}
const OperatorsSelectField: React.FC<OperatorsSelectFieldProps> = ({
  id,
}: OperatorsSelectFieldProps) => {
  const options = useMemo(() => {
    return map(
      filter(keys(BDDOperator), (item) => {
        return item !== BDDOperator.BACKGROUND && item !== BDDOperator.SCENARIO;
      }),
      (item) => ({
        value: item,
        name: <Text messageKey={item as MessageKeys} />,
      })
    );
  }, []);

  return (
    <SelectField
      label={TEXT_KEYS.NAME}
      id={id}
      options={options}
      submitOnChange
    />
  );
};

interface BDDEditorProps {
  id: string;
  edit?: boolean;
}

class BddFormData extends Bdd {
  constructor(steps?: Bdd["steps"]) {
    super();
    if (steps) {
      this.steps = map(steps, (step) => ({ ...step, uiId: nanoid() }));
    }
  }
  static PATHS = {
    steps: "steps",
  };
}

const Actions = () => {
  const { submitForm, values } = useFormikContext<BddFormData>();
  const index = size(values.steps);

  const [, , helpers] = useField<BddFormData["steps"][number]>(
    `${BddFormData.PATHS.steps}.${index}`
  );
  const addStep = useCallback(() => {
    helpers.setValue(new BddStep());
  }, [helpers]);

  return (
    <Stack direction='row' justifyContent='space-between'>
      <Button messageKey={TEXT_KEYS.ADD_STEP} onClick={addStep} />
      <Button
        messageKey={TEXT_KEYS.SAVE_SCRIPT}
        onClick={submitForm}
        color='success'
      />
    </Stack>
  );
};

const Input = ({ index }: { index: string }) => {
  return (
    <TextField
      multiline
      fullWidth
      size='small'
      id={`${BddFormData.PATHS.steps}.${index}.content`}
      label={TEXT_KEYS.CONTENT}
    />
  );
};
const Item = memo(({ index }: { index: string }) => {
  const [, , helpers] = useField<BddFormData["steps"][number]>(
    `${BddFormData.PATHS.steps}.${index}`
  );
  const onDelete = () => {
    // @ts-ignore
    helpers.setValue(null);
  };
  return (
    <Stack direction='row' alignItems='center'>
      <OperatorsSelectField
        id={`${BddFormData.PATHS.steps}.${index}.operator`}
      />
      <Input index={index} />
      <IconButton onClick={onDelete}>
        <AiFillDelete size={20} />
      </IconButton>
    </Stack>
  );
});

const useSteps = () => {
  const [field] = useField<BddFormData["steps"]>(BddFormData.PATHS.steps);

  return useDeepCompareMemo(() => {
    return map(field.value, (item) => {
      if (!item) return null;
      return item.uiId;
    });
  }, [hash_sum(field.value)]);
};

const Content: React.FC = () => {
  const { palette } = useTheme();
  const steps = useSteps();
  return (
    <Stack spacing={2} bgcolor={palette.secondary.light} p={5}>
      {map(steps, (step, index) => {
        if (!step) return null;
        return <Item key={step} index={String(index)} />;
      })}
      <Actions />
    </Stack>
  );
};

const BDDEditor = ({ id, edit }: BDDEditorProps) => {
  const testCase = useTestCase();

  const initialValues = useMemo(() => {
    if (!edit) return new BddFormData();
    return new BddFormData(testCase?.bdd?.steps);
  }, [edit, testCase?.bdd?.steps]);
  const [, , helpers] = useField<BddFormData>(id);
  const onSubmit = useCallback(
    (data: BddFormData) => {
      helpers.setValue(data);
    },
    [helpers]
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Content />
    </Formik>
  );
};
const FormFields = ({ id, edit, featureId }: FormFieldsProps) => {
  const loadingCreateTestCase = useLoadingCreateTestCase();
  const isLoadingUpdateTestCase = useLoadingUpdateTestCase();
  return (
    <Stack spacing={2}>
      {id && featureId && (
        <Link to={ROUTES.getExecuteTestCaseRoute(featureId, id)}>
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
      <TextField id={NewTestCaseFormData.PATHS.name} label={TEXT_KEYS.NAME} />
      <TextField
        id={NewTestCaseFormData.PATHS.description}
        label={TEXT_KEYS.DESCRIPTION}
        multiline
        rows={2}
      />
      <FeaturesSelectField id={NewTestCaseFormData.PATHS.featureId} />
      <ProjectsSelectField
        id={NewTestCaseFormData.PATHS.projectId}
        hideActions
      />
      <VersionsSelectField
        id={NewTestCaseFormData.PATHS.versionsIds}
        multiple
        hideActions
      />
      <BDDEditor id={NewTestCaseFormData.PATHS.bdd} edit={edit} />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={loadingCreateTestCase || isLoadingUpdateTestCase}
      />
    </Stack>
  );
};

export const NewTestCaseForm: React.FC = () => {
  const start = useCreateTestCase();
  const navigate = useNavigate();
  const load = useLoadTestCases();
  const onSubmit = useCallback(
    (data: NewTestCaseFormData) => {
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
    const values = new NewTestCaseFormData();
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

function useLoadTestCase(testCaseIdParam?: string) {
  const { id, testCaseId } = useParams();
  const finalId = testCaseIdParam || testCaseId || id;
  const start = useLoadTestCaseByID();
  useDeepCompareEffect(() => {
    if (finalId) {
      start({ id: finalId });
    }
  }, [finalId, id, start]);
}
export const EditTestCaseForm: React.FC<{ testCaseIdParam?: string }> = ({
  testCaseIdParam,
}) => {
  useLoadTestCase(testCaseIdParam);
  const testCase = useTestCase();
  const initialValues = useMemo(() => {
    return new NewTestCaseFormData(testCase || {});
  }, [testCase]);

  const start = useStartUpdateTestCase();
  const navigate = useNavigate();
  const { testCaseId, id } = useParams();
  const load = useLoadTestCases();
  const finalTestCaseId = testCaseIdParam || (testCaseId as string);
  const onSubmit = useCallback(
    (data: NewTestCaseFormData) => {
      if (testCaseId) {
        start(
          { ...data, id: finalTestCaseId },
          {
            onSuccess: () => {
              navigate(ROUTES.TEST_CASES);
              load(null);
            },
          }
        );
      }
    },
    [finalTestCaseId, load, navigate, start, testCaseId]
  );
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SCHEMA}
        enableReinitialize
      >
        <FormFields id={testCaseId} featureId={id} edit />
      </Formik>
    </Paper>
  );
};

class ExecuteTestCaseFormData
  extends NewTestCaseFormData
  implements CreateTestExecutionPayload
{
  executedBy = "";
  executionDate = "";
  notes = "";
  resolution: boolean | null = null;
  constructor(params: Partial<ExecuteTestCaseFormData> = {}) {
    super(params);
    return {
      ...this,
      ...params,
    };
  }

  static PATHS = {
    ...NewTestCaseFormData.PATHS,
    executedBy: "executedBy",
    executionDate: "executionDate",
    notes: "notes",
    resolution: "resolution",
  };
}

const Resolution = () => {
  const [field, , helpers] = useField<ExecuteTestCaseFormData["resolution"]>(
    ExecuteTestCaseFormData.PATHS.resolution
  );
  const onPassed = useCallback(() => {
    helpers.setValue(true);
  }, [helpers]);

  const onFailed = useCallback(() => {
    helpers.setValue(false);
  }, [helpers]);
  return (
    <ButtonGroup>
      <Button
        messageKey={TEXT_KEYS.FAILED}
        variant={field.value === false ? "contained" : "outlined"}
        color={field.value === false ? "error" : undefined}
        onClick={onFailed}
      />
      <Button
        messageKey={TEXT_KEYS.PASSED}
        variant={field.value === true ? "contained" : "outlined"}
        color={field.value === true ? "success" : undefined}
        onClick={onPassed}
      />
    </ButtonGroup>
  );
};

const BOLD_UPPERCASE = { fontWeight: "bold", textTransform: "uppercase" };

const FieldResolution = ({ index }: { index: number }) => {
  const [field, , helpers] = useField<ExecuteTestCaseFormData["resolution"]>(
    `${ExecuteTestCaseFormData.PATHS.bdd}.steps.${index}.resolution`
  );
  const onPassed = useCallback(() => {
    helpers.setValue(true);
  }, [helpers]);

  const onFailed = useCallback(() => {
    helpers.setValue(false);
  }, [helpers]);
  return (
    <Stack direction='row'>
      <IconButton
        onClick={onFailed}
        color={field.value === false ? "error" : undefined}
      >
        <AiOutlineCloseCircle />
      </IconButton>
      <IconButton
        onClick={onPassed}
        color={field.value === true ? "success" : undefined}
      >
        <AiOutlineCheckCircle />
      </IconButton>
    </Stack>
  );
};

interface BddRendererContentProps {
  steps: BddStep[];
  readOnly?: boolean;
}
export const BddRendererContent: React.FC<BddRendererContentProps> = ({
  steps,
  readOnly,
}: BddRendererContentProps) => {
  const { palette } = useTheme();

  return (
    <Stack spacing={1}>
      {map(steps, (step, i) => {
        if (!step) return null;
        let color = undefined;
        if (readOnly && step?.resolution === true) {
          color = palette.success.main;
        } else if (readOnly && step?.resolution === false) {
          color = palette.error.main;
        }
        return (
          // @ts-ignore
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            key={hash_sum({ step, i })}
          >
            <Stack width={100}>
              <Text
                sx={BOLD_UPPERCASE}
                messageKey={step?.operator as MessageKeys}
                color={color}
              />
            </Stack>
            <Stack width={450}>
              <BasicText color={color}>{step.content}</BasicText>
            </Stack>
            {!readOnly && <FieldResolution index={i} />}
          </Stack>
        );
      })}
    </Stack>
  );
};
const BddRenderer = () => {
  const [field] = useField<ExecuteTestCaseFormData["bdd"]>(
    ExecuteTestCaseFormData.PATHS.bdd
  );
  return <BddRendererContent steps={field.value.steps} />;
};

const ExecuteTestCaseSubmitButton = () => {
  const loading = useLoadingCreateTestExecution();
  return <SubmitButton messageKey={TEXT_KEYS.SAVE} disabled={loading} />;
};

export const ExecuteTestCaseForm: React.FC<{ testCaseIdParam?: string }> = ({
  testCaseIdParam,
}) => {
  const testCases = useTestCases();
  useLoadTestCase(testCaseIdParam);
  useStartOnMount(null, null);
  const reload = useReloadEverything();

  const loggedUser = useData();
  const testCase = useTestCase();
  const finalTestCase = useMemo(() => {
    if (!testCase) return find(testCases, { _id: testCaseIdParam });
    return testCase;
  }, [testCase, testCases, testCaseIdParam]);
  const initialValues = useMemo(() => {
    const values = new ExecuteTestCaseFormData(finalTestCase || {});
    values.executedBy = loggedUser?._id || "";
    values.executionDate = dayjs().toISOString();
    return values;
  }, [loggedUser?._id, finalTestCase]);

  const createTestExecution = useStartCreateTestExecution();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = useCallback(
    (data: ExecuteTestCaseFormData) => {
      // @ts-ignore
      data._id = undefined;
      createTestExecution(data, {
        onSuccess: () => {
          reload();
          if (id && !testCaseIdParam)
            navigate(ROUTES.getFeatureTestExecutionsRoute(id));
        },
      });
    },
    [reload, createTestExecution, id, navigate, testCaseIdParam]
  );
  if (!finalTestCase) return null;
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
      >
        <Stack spacing={2}>
          <BddRenderer />
          <TextField
            label={TEXT_KEYS.NOTES}
            id={ExecuteTestCaseFormData.PATHS.notes}
            multiline
            rows={2}
          />
          <Resolution />
          <ExecuteTestCaseSubmitButton />
        </Stack>
      </Formik>
    </Paper>
  );
};
