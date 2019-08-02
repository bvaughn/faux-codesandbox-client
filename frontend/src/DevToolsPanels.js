import React, { useEffect, useState } from 'react';
import initFrontend from 'react-devtools-inline/initFrontend';

export default function DevToolsPanel({ defaultTab, frameID, hidden }) {
  const [ui, setUI] = useState(null);

  useEffect(() => {
    if (ui === null) {
      const frame = document.getElementById(frameID);
      const { contentWindow } = frame;

      const optionalProps = {
        defaultTab: defaultTab,
        showTabBar: false,
      };

      setUI(initFrontend(frame, optionalProps));

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
  }, [defaultTab, frameID, ui]);

  if (hidden) {
    return null;
  }

  return ui;
}
