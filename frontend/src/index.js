import React from 'react';
import { unstable_createSyncRoot as createSyncRoot } from 'react-dom';
import './index.css';
import App from './App';

// It's important to use either createRoot() or createSyncRoot() for DevTools UI!
// Sync root is a safer incremental step if the surrounding app is not yet concurrent mode compatible.
const root = createSyncRoot(document.getElementById('root'));
root.render(<App />);
