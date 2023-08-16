import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ResetStyle from './Style/ReseStyle';
import GlobalStyle from './Style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
