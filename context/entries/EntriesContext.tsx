import { createContext } from 'react';
import { Entry } from '../../interfaces';

export interface ContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    deleteEntry: (id: string) => void;
    updatedEntry: (entry: Entry) => void;

}
export const EntriesContext = createContext({} as ContextProps)