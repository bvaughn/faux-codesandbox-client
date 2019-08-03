import installHook from 'react-devtools-inline/installHook';

// The DevTooks hook needs to be installed before React is even required!
// In a production app this should probably be done via a separate script tag,
// so we don't need to mix and match import and require statements...
installHook();
