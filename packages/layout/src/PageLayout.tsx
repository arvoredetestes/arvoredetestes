import { ROUTES } from "@monorepo/navigation/src/routes";
import { useIsUserLoggedIn } from "@monorepo/store/src/user/login";
import { Text } from "@monorepo/texts/src/Components";
import { TEXT_KEYS } from "@monorepo/texts/src/keys";
import { Stack, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { BiUserCircle } from "react-icons/bi";
import { FaTree } from "react-icons/fa";
import { Link } from "react-router-dom";

import { ProjectSelector, VersionSelector } from "./SelectFields";

interface Props {
  children: React.ReactNode;
}

const GRID_SX = {
  justifyContent: "space-around",
  alignItems: "center",
};

const BOX_SX = { boxShadow: 1 };
const DIV_STYLE = {
  display: "flex",
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
};
export const Header: React.FC = () => {
  const isUserLoggedIn = useIsUserLoggedIn();
  return (
    <AppBar position='fixed' color='secondary' sx={BOX_SX}>
      <Toolbar>
        {isUserLoggedIn && (
          <Grid direction='row' container sx={GRID_SX}>
            <div style={DIV_STYLE}>
              <ProjectSelector />
              <VersionSelector />
            </div>
            <div style={DIV_STYLE}>
              <Link to={ROUTES.HOME}>
                <FaTree />
              </Link>
            </div>
            <div style={DIV_STYLE}>
              <Link to={ROUTES.HELP}>
                <Text
                  messageKey={TEXT_KEYS.HELP}
                  align='center'
                  sx={{ marginX: 1 }}
                />
              </Link>
              <Link to={ROUTES.TEAM}>
                <Text
                  messageKey={TEXT_KEYS.TEAM}
                  align='center'
                  sx={{ marginX: 1 }}
                />
              </Link>
              <Link to={ROUTES.ME}>
                <BiUserCircle size={40} />
              </Link>
            </div>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  );
};
export const PageLayout: React.FC<Props> = ({ children, ...rest }: Props) => {
  const { palette } = useTheme();
  return (
    <Stack>
      <Header />
      <Grid bgcolor={palette.common.white} {...rest}>
        {children}
      </Grid>
    </Stack>
  );
};
