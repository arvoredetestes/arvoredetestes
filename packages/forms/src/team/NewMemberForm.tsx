import { ROUTES } from "@monorepo/navigation/src/routes";
import { useLoading, useStart } from "@monorepo/store/src/user/create-user";
import {
  useData,
  useLoading as useLoadingUser,
  useStart as useLoadUserById,
} from "@monorepo/store/src/user/get-user";
import {
  useLoading as useLoadingUpdateUser,
  useStart as useStartUpdateUser,
} from "@monorepo/store/src/user/update-user";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class NewMemberFormData {
  password = "";
  confirmPassword = "";
  name = "";
  email = "";

  static PATHS = {
    password: "password",
    confirmPassword: "confirmPassword",
    name: "name",
    email: "email",
  };
}

const SCHEMA = yup.object().shape({
  [NewMemberFormData.PATHS.password]: yup
    .string()
    .min(8)
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewMemberFormData.PATHS.confirmPassword]: yup
    .string()
    .min(8)
    .test("same-as-password", function test(value) {
      return this.parent.password === value;
    })
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewMemberFormData.PATHS.name]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [NewMemberFormData.PATHS.email]: yup
    .string()
    .email(TEXT_KEYS.VALIDATION_STRING_EMAIL)
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
});

const INITIAL_VALUES = new NewMemberFormData();

const PAPER_STYLE = {
  padding: 5,
  width: 800,
  margin: "0 auto",
};

interface FormFieldsProps {
  id?: string;
}
const FormFields = ({ id }: FormFieldsProps) => {
  const isLoading = useLoading();
  const isLoadingUser = useLoadingUser();
  const isLoadingUpdateUser = useLoadingUpdateUser();
  return (
    <Stack spacing={2}>
      <Stack alignItems='center'>
        <AiOutlineUserAdd />
      </Stack>
      <TextField id={NewMemberFormData.PATHS.name} label={TEXT_KEYS.NAME} />{" "}
      <TextField id={NewMemberFormData.PATHS.email} label={TEXT_KEYS.EMAIL} />
      <TextField
        id={NewMemberFormData.PATHS.password}
        label={TEXT_KEYS.PASSWORD}
        type='password'
      />
      <TextField
        id={NewMemberFormData.PATHS.confirmPassword}
        label={TEXT_KEYS.CONFIRM_PASSWORD}
        type='password'
      />
      <SubmitButton
        messageKey={id ? TEXT_KEYS.SAVE : TEXT_KEYS.CREATE}
        disabled={isLoading || isLoadingUser || isLoadingUpdateUser}
      />
    </Stack>
  );
};
export const NewMemberForm: React.FC = () => {
  const start = useStart();
  const navigate = useNavigate();
  const onSubmit = useCallback(
    (data: NewMemberFormData) => {
      start(data, { onSuccess: () => navigate(ROUTES.TEAM) });
    },
    [navigate, start]
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

function useLoadUser() {
  const { id } = useParams();
  const ref = useRef(false);
  const start = useLoadUserById();
  useEffect(() => {
    if (id && !ref.current) {
      start({ id });
      ref.current = true;
    }
  }, [id, start]);
}
export const EditMemberForm: React.FC = () => {
  useLoadUser();
  const user = useData();
  const initialValues = useMemo(() => {
    const values = new NewMemberFormData();
    if (user) {
      values.email = user.email;
      values.name = user.name;
      // values.password = user.password;
      // values.confirmPassword = user.confirmPassword;
    }

    return values;
  }, [user]);

  const start = useStartUpdateUser();
  const navigate = useNavigate();
  const { id } = useParams();

  const onSubmit = useCallback(
    (data: NewMemberFormData) => {
      if (id) {
        start({ ...data, id }, { onSuccess: () => navigate(ROUTES.TEAM) });
      }
    },
    [id, navigate, start]
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
