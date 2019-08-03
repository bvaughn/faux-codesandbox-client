import initBackend from 'react-devtools-inline/initBackend';

// Wait for the frontend Store to be ready before initializing the backend.
// This way the Store doesn't miss any tree operations.
window.addEventListener('message', ({ data }) => {
  switch (data.type) {
    case 'initBackend':
      initBackend();
      break;
    default:
      break;
  }
});
