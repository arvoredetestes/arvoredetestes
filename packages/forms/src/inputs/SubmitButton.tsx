import { MessageKeys, useText } from "@monorepo/texts";
import { Button, ButtonProps } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";

interface Props {
  messageKey: MessageKeys;
}
export const SubmitButton: React.FC<Props & ButtonProps> = ({
  messageKey,
  ...rest
}: Props) => {
  const text = useText({ key: messageKey });
  const { submitForm } = useFormikContext();
  return (
    <Button variant='contained' onClick={submitForm} {...rest}>
      {text}
    </Button>
  );
};
