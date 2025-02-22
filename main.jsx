import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// app imports
import DinnersIn from './src/apps/DinnersIn/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DinnersIn />
  </StrictMode>,
);
