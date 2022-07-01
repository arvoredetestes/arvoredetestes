import "./wdyr";
import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

import { Provider } from "@ez-dux/react";
import { Navigation } from "@monorepo/navigation";
import { initStore } from "@monorepo/store";
import { createTheme, ThemeProvider } from "@mui/material";
import { ptBR } from "@mui/x-data-grid";
import dayjs from "dayjs";
import React from "react";

const BASIC_DEFAULT_PROPS = {
  style: {
    borderRadius: 0,
  },
};
const THEME = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: "#2892D7",
      },
      secondary: { main: "#EEF6FC" },
    },
    components: {
      MuiButton: {
        defaultProps: BASIC_DEFAULT_PROPS,
      },
      MuiSelect: {
        defaultProps: BASIC_DEFAULT_PROPS,
      },
      MuiInputBase: {
        defaultProps: BASIC_DEFAULT_PROPS,
      },
      MuiPaper: {
        defaultProps: BASIC_DEFAULT_PROPS,
      },
    },
  },
  ptBR
);

function App(): React.ReactElement {
  return (
    <div className='App'>
      <Provider createStore={initStore}>
        <ThemeProvider theme={THEME}>
          <Navigation />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
