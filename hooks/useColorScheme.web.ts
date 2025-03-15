import { useEffect, useState } from 'react';

/**
 * Modified to always return 'light' theme regardless of system setting
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Always return 'light' regardless of system setting
  return 'light';
}
