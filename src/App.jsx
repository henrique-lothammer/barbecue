import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
