import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ResetStyle from './style/ResetStyle.js';
import GlobalStyle from './style/GlobalStyle.js';
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ChakraProvider>
        <ResetStyle />
        <GlobalStyle />
        <App />
      </ChakraProvider>
  </React.StrictMode>
);
