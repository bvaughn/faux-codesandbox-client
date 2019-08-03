import React, { useEffect, useRef, useState } from 'react';
import DevToolsPanel from './DevToolsPanels';
import './App.css';

export default function App() {
  const [tabID, setTabID] = useState();
  const componentsRef = useRef(null);
  const iframeRef = useRef(null);
  const profilerRef = useRef(null);

  useEffect(() => {
    setTabID('components');
  }, []);

  return (
    <div className="App">
      <iframe
        ref={iframeRef}
        id="sandbox"
        className="Frame"
        title="sandbox"
        sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation"
        allow="geolocation; microphone; camera;midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
        src={process.env.REACT_APP_IFRAME_SRC}
      ></iframe>
      <div className="Console">
        <div className="Tabs">
          <button
            className={`Tab ${tabID === 'components' ? 'TabActive' : ''}`}
            onClick={() => setTabID('components')}
          >
            <span role="img" aria-label="React icon">
              ⚛️
            </span>{' '}
            Components
          </button>
          <button
            className={`Tab ${tabID === 'profiler' ? 'TabActive' : ''}`}
            onClick={() => setTabID('profiler')}
          >
            <span role="img" aria-label="React icon">
              ⚛️
            </span>{' '}
            Profiler
          </button>
        </div>
        <div className="TabContent">
          <div ref={componentsRef} hidden={tabID !== 'components'} />
          <div ref={profilerRef} hidden={tabID !== 'profiler'} />
        </div>
        {iframeRef.current !== null && (
          <DevToolsPanel
            componentsPortalContainer={componentsRef.current}
            iframe={iframeRef.current}
            overrideTab={tabID}
            profilerPortalContainer={profilerRef.current}
          />
        )}
      </div>
    </div>
  );
}
