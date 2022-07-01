import { MessageKeys, useText } from "@monorepo/texts";
import ButtonMUI, { ButtonProps } from "@mui/material/Button";
import * as React from "react";

interface Props {
  messageKey: MessageKeys;
}
export const Button: React.FC<Props & ButtonProps> = ({
  messageKey,
  ...rest
}: Props) => {
  const text = useText({ key: messageKey });
  return <ButtonMUI {...rest}>{text}</ButtonMUI>;
};

Button.defaultProps = {
  variant: "contained",
};
