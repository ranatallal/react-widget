import React from "react";
import "./App.css";
import { createBrowserHistory } from "history";
import { CustomDataGrid } from "./components";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export const App = ({ history = createBrowserHistory(), widget = false }) => {
  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={createTheme()}>
        <div className="Widget">
          <div className="Widget-container">
            <CustomDataGrid title={"name"} subtitle={"amount"} />
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
};
