import { createContext } from 'react';

export const LayersContext = createContext<Record<string, string>>({});
export const SemanticLayerPrefixContext = createContext<undefined | string>(undefined);
