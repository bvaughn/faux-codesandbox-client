import React, { useEffect, useState } from 'react';
import initFrontend from 'react-devtools-inline/initFrontend';

export default function DevToolsPanel({ defaultTab, frameID, hidden }) {
  // eslint-disable-next-line no-unused-vars
  const [DevToolsUI, setDevToolsUI] = useState(null);

  useEffect(() => {
    if (DevToolsUI === null) {
      const frame = document.getElementById(frameID);
      const { contentWindow } = frame;

      const optionalProps = {
        defaultTab: defaultTab,
        showTabBar: false,
      };

      setDevToolsUI(initFrontend(frame, optionalProps));

      // Let the backend know to initialize itself.
      // We can't do this directly because the iframe is sandboxed.
      // Only initialize the backend once the DevTools frontend Store has been initialized!
      // Otherwise the Store may miss important initial tree op codes.
      frame.onload = () => {
        contentWindow.postMessage({
          type: 'initBackend'
        }, '*');
      };
    }
  }, [defaultTab, frameID, DevToolsUI]);

  if (hidden) {
    return null;
  }

  return DevToolsUI;
}
