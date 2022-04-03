import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
const cache = createCache({
  key: 'css',
  prepend: true,
});

export default function GlobalCssPriority() {
  return (
    <CacheProvider value={cache}>
      {/* Your component tree. Now you can override MUI's styles. */}
    </CacheProvider>
  );
}
