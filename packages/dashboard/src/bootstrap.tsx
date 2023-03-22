import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mount = (el: Element) => {
  createRoot(el).render(<App />);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard_dev_root');

  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
