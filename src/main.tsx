
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { SpeedInsights } from "@vercel/speed-insights/next"
import './index.css';

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <SpeedInsights/>
  </React.StrictMode>
);
