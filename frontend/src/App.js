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
          <div className="Tab TabDisabled">Console</div>
          <div className="Tab TabDisabled">Prolems</div>
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

          <svg
            fill="currentColor"
            preserveAspectRatio="xMidYMid meet"
            height="12px"
            width="12px"
            viewBox="0 0 40 40"
            className="Icon"
          >
            <g>
              <path d="m31 26.4q0 0.3-0.2 0.5l-1.1 1.2q-0.3 0.2-0.6 0.2t-0.5-0.2l-8.7-8.8-8.8 8.8q-0.2 0.2-0.5 0.2t-0.5-0.2l-1.2-1.2q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.6-0.2t0.5 0.2l10.4 10.4q0.2 0.2 0.2 0.5z"></path>
            </g>
          </svg>
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
