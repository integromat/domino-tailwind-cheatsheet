import { createContext } from 'react';

export const LayersContext = createContext<Record<string, string>>({});
export const SemanticLayerPrefixContext = createContext<string | null>(null);
