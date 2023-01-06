import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import { EntriesContext, entriesReducer } from './';
import { Entry } from '../../interfaces';
import entriesApi from '../../apis/entriesApi';
import { updateEntryInterface } from '../../interfaces/updateEntryInterface';

export interface EntriesState {
    entries: Entry[]
}
export const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {
        const { data } = await entriesApi.post<Entry>('/entries', { description })
        dispatch({ type: '[Entry] - Add-Entry', payload: data })
    }
    const deleteEntry = async (id: string) => {
        try {
            const result = await entriesApi.delete((`/entries/${id}`))
            dispatch({ type: '[Entry] - remove-entry', payload: id })
            return result
        } catch (error) {
            console.log({ error });

        }
    }

    const updatedEntry = async ({ _id, description, status }: Entry) => {
        try {
            const result: updateEntryInterface = await entriesApi.put(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] - entry-updated', payload: result.data })
            return result

        } catch (error) {
            console.log({ error });
        }
    }
    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] - refresh-data', payload: data })
    }

    useEffect(() => {
        refreshEntries()
    }, [])

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                //Methods
                addNewEntry,
                deleteEntry,
                updatedEntry,
            }}

        >
            {children}
        </EntriesContext.Provider>
    )
}