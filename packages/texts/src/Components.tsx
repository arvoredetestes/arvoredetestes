import Typography, { TypographyProps } from "@mui/material/Typography";
import dayjs from "dayjs";
import React from "react";

import { Message, useText } from ".";
export interface Props extends TypographyProps {
  messageKey: Message["key"];
  values?: Message["values"];
}

export const BasicText = Typography;

export const DateText: React.FC<{ children: string }> = ({
  children,
  ...rest
}: {
  children: string;
}) => {
  const dateString = dayjs(children).format("DD/MM/YYYY");
  return <BasicText {...rest}>{dateString}</BasicText>;
};

export const Text: React.FC<Props> = ({
  messageKey,
  values,
  ...rest
}: Props) => {
  const text = useText({ key: messageKey, values });
  return <BasicText {...rest}>{text}</BasicText>;
};
