import React, { useMemo } from 'react';
import {
  createMuiTheme, CssBaseline, MuiThemeProvider, useMediaQuery,
} from '@material-ui/core';
import { AppRouter } from './router';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () => createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <AppRouter />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
