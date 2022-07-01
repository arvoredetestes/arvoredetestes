import { useError, useLoading, useStart } from "@monorepo/store/src/user/login";
import { BasicText } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import { Formik } from "formik";
import React from "react";
import { FaTree } from "react-icons/fa";
import * as yup from "yup";

import { SubmitButton } from "../inputs/SubmitButton";
import { TextField } from "../inputs/TextField";

class LoginFormData {
  email = "";
  password = "";

  static PATHS = {
    email: "email",
    password: "password",
  };
}

const SCHEMA = yup.object().shape({
  [LoginFormData.PATHS.email]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
  [LoginFormData.PATHS.password]: yup
    .string()
    .required(TEXT_KEYS.VALIDATION_STRING_REQUIRED),
});

const INITIAL_VALUES = new LoginFormData();

const PAPER_STYLE = {
  width: 500,
  padding: 4,
};

export const LoginForm: React.FC = () => {
  const isLoading = useLoading();
  const error = useError();
  const onSubmit = useStart();
  return (
    <Paper sx={PAPER_STYLE}>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={SCHEMA}
      >
        <Stack spacing={2}>
          <Stack alignItems='center'>
            <FaTree />
          </Stack>
          <TextField id={LoginFormData.PATHS.email} label={TEXT_KEYS.EMAIL} />
          <TextField
            id={LoginFormData.PATHS.password}
            label={TEXT_KEYS.PASSWORD}
            type='password'
          />
          <SubmitButton messageKey={TEXT_KEYS.LOGIN} disabled={isLoading} />
          {!!error && <BasicText>{error.message}</BasicText>}
        </Stack>
      </Formik>
    </Paper>
  );
};
