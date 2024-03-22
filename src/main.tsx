import React from 'react';
import { ThemeProvider } from 'styled-components';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';

import { theme } from './shared/styles/thema.ts';
import { GlobalStyles } from './shared/styles/GlobalStyles.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  </React.StrictMode>
);
