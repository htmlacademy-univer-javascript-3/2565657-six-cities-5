import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './react/main-page/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offerCount={6} />
  </React.StrictMode>
);
