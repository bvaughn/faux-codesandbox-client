import { createElement, useEffect, useState } from 'react';
import { initialize } from 'react-devtools-inline/frontend';

export default function DevToolsPanel({
  componentsPortalContainer,
  iframe,
  overrideTab,
  profilerPortalContainer,
}) {
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (Component === null) {
      const { contentWindow } = iframe;

      setComponent(initialize(iframe));

      // Let the backend know to initialize itself.
      // We can't do this directly because the iframe is sandboxed.
      // Only initialize the backend once the DevTools frontend Store has been initialized!
      // Otherwise the Store may miss important initial tree op codes.
      iframe.onload = () => {
        contentWindow.postMessage(
          {
            type: 'activate',
          },
          '*'
        );
      };
    }
  }, [iframe, Component]);

  if (Component === null) {
    return null;
  } else {
    return createElement(Component, {
      overrideTab,
      showTabBar: false,
    });
  }
}
