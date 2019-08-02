import React, { useEffect, useState } from 'react';
import DevTools from 'react-devtools-inline/DevTools';
import initFrontend from 'react-devtools-inline/initFrontend';

let bridge = null;
let store = null;

function Content({ defaultTab, frameID, hidden }) {
  // eslint-disable-next-line no-unused-vars
  const [_, setInitialized] = useState(false);

  useEffect(() => {
    if (bridge === null) {
      const frame = document.getElementById(frameID);
      const { contentWindow } = frame;

      [bridge, store] = initFrontend(frame);

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

    setInitialized(true);
  }, [frameID]);

  if (hidden) {
    return null;
  }

  return bridge === null ? null : (
    <DevTools
      bridge={bridge}
      defaultTab={defaultTab}
      showTabBar={false}
      store={store}
    />
  );
}

export const Components = ({ frameID, hidden }) => <Content defaultTab="components" frameID={frameID} hidden={hidden} />;
export const Profiler = ({ frameID, hidden }) => <Content defaultTab="profiler" frameID={frameID} hidden={hidden} />;