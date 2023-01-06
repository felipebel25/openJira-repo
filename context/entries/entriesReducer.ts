import { Entry } from '../../interfaces';
import { EntriesState } from './EntriesProvider';

type EntriesType =
  | { type: '[Entry] - Add-Entry', payload: Entry }
  | { type: '[Entry] - remove-entry', payload: string }
  | { type: '[Entry] - entry-updated', payload: Entry | any }
  | { type: '[Entry] - refresh-data', payload: Entry[]  }


export const entriesReducer = (state: EntriesState, action: EntriesType): EntriesState => {
  switch (action.type) {
    //vamos a guardar el estado y los entries que se hubieron hecho y agregamos un nuevo entry mediante el action.payload
    case '[Entry] - Add-Entry':
      return {
        ...state,
        entries: [...state.entries, action.payload]

      }
    case '[Entry] - remove-entry':
      return {
        ...state,
        entries: state.entries.filter((entry: Entry) => {
          if (entry._id !== action.payload) {
            return entry
          }
        })
      }
    case '[Entry] - entry-updated':
      return {
        ...state,
        entries: state.entries.map((entry => {
          if (entry._id === action.payload._id) {
            entry.status = action.payload.status
            entry.description = action.payload.description

          }
          return entry
        }))
      }
    case '[Entry] - refresh-data':
      return {
        ...state,
        entries: [...action.payload]
      }
    default:
      return state;
  }
}