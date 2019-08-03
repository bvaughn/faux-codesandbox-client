import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

import './index.css';

ReactDOM.render(<List />, document.getElementById('root'));

/* This enables the frontend to inject code into the iframe, even though it is sandboxed.
window.addEventListener('message', ({ data }) => {
  switch (data.type) {
    case 'eval':
      eval(data.payload);
      break;
  }
});
*/
