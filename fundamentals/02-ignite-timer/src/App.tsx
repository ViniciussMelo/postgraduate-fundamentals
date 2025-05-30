import { BrowserRouter } from 'react-router-dom';

import { defaultTheme } from './styles/themes/default';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';

import { CyclesContextProvider } from './contexts/CyclesContext';

import { Router } from './Router';

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
