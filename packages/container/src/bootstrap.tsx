import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log('[ERWT]: Renderer execution started');
const app = <App />;

createRoot(document.getElementById('root')).render(app);
