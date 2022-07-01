import { useText } from "@monorepo/texts";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import React from "react";
// @ts-ignore
import HTMLRenderer from "react-html-renderer";
export const Help: React.FC = () => {
  const text = useText({ key: TEXT_KEYS.HELP_CONTENT });
  return (
    <Stack width='80vw' p={0}>
      <Paper>
        <Stack p={5}>
          <HTMLRenderer html={text} />
        </Stack>
      </Paper>
    </Stack>
  );
};
