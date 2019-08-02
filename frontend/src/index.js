import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const frame = document.getElementById('sandbox');

frame.onload = () => {
  // It is now safe to postMessage data to the frame.
};

/* This enables the frontend to inject code into the iframe, even though it is sandboxed.
function evalInFrame(code) {
  frame.contentWindow.postMessage({
    type: 'eval',
    payload: code
  }, '*');
}
*/
