
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RootContext } from 'context/RootContetx';
import App from 'App';

const rootElement = document.getElementById('meta-root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RootContext.Provider value={root}>
      <App />
    </RootContext.Provider>
  </React.StrictMode>
);

