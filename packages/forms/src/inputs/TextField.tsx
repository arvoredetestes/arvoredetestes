import { MessageKeys, useText } from "@monorepo/texts";
import TextFieldMUI from "@mui/material/TextField";
import { TextFieldProps as TextFieldPropsMUI } from "@mui/material/TextField/TextField";
import { useField } from "formik";
import * as React from "react";

interface TextFieldProps {
  label: MessageKeys;
  id: string;
}
export const TextField: React.FC<
  TextFieldProps & Omit<TextFieldPropsMUI, "onBlur">
> = ({ id, label, ...rest }) => {
  const text = useText({ key: label });
  const [field, meta] = useField(id);
  const errorText = useText({ key: meta.error as MessageKeys });

  return (
    <TextFieldMUI
      id={id}
      label={text}
      variant='outlined'
      error={!!(meta.touched && meta.error)}
      helperText={meta.touched && errorText}
      {...field}
      {...rest}
    />
  );
};
