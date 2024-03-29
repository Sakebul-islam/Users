import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './routes/Router';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
