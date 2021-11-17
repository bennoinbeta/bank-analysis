import React, { useState } from 'react';
import { generateId } from '@agile-ts/utils';

export function useId(staticId?: string): string {
  const [id, setId] = useState<string>('unknown');

  React.useEffect(() => {
    setId(generateId());
  }, []);

  return staticId ?? id;
}
