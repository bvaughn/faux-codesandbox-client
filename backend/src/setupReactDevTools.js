import { activate } from 'react-devtools-inline/backend';

const listener = ({ data }) => {
  switch (data.type) {
    case 'activate':
      window.removeEventListener('message', listener);

      // Wait for the frontend Store to be ready before initializing the backend.
      // This way the Store doesn't miss any tree operations.
      activate(window);
      break;
    default:
      break;
  }
};

window.addEventListener('message', listener);
