import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './index.css';
import App from './App';
import { ThemeProvider } from '@context/ThemeContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '@context/LanguageProvider/LanguageProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <App />
        <ToastContainer />
      </I18nextProvider>
    </ThemeProvider>
    ,
  </StrictMode>,
);
