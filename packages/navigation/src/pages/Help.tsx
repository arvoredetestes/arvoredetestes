import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Paper, Stack } from "@mui/material";
import React from "react";

export const Help: React.FC = () => {
  return (
    <Stack width='80vw' p={3} spacing={2}>
      <Paper>
        <Stack p={10}>
          <Text messageKey={TEXT_KEYS.HELP_CONTENT} />
        </Stack>
      </Paper>
    </Stack>
  );
};
