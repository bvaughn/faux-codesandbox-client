import React, { useState } from 'react';
import { Components, Profiler } from './DevToolsPanels';
import './App.css';

function App() {
  const [tabID, setTabID] = useState('components');

  return (
    <div className="App">
      <iframe
        id="sandbox"
        className="Frame"
        title="sandbox"
        sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation"
        allow="geolocation; microphone; camera;midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        src="http://localhost:3002/">
      </iframe>
      <div className="Console">
        <div className="Tabs">
          <button
            className={`Tab ${tabID === 'components' ? 'TabActive' :''}`}
            onClick={() => setTabID('components')}
           >
            <span role="img" aria-label="React icon">⚛️</span> Components
          </button>
          <button
            className={`Tab ${tabID === 'profiler' ? 'TabActive' :''}`}
            onClick={() => setTabID('profiler')}
           >
            <span role="img" aria-label="React icon">⚛️</span> Profiler
          </button>
         </div>
         <div className="TabContent">
            <Components frameID='sandbox' hidden={tabID !== 'components'} />
            <Profiler frameID='sandbox' hidden={tabID !== 'profiler'} />
         </div>
       </div>
    </div>
  );
}

export default App;
