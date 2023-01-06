import { UIState } from './UIProvider';

type UIType =
  | { type: '[UI] - OpenSidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - isAddingEntry' }
  | { type: 'UI - changeStatusAddingEntry', payload: boolean }
  | { type: 'UI - start dragging' }
  | { type: 'UI - end dragging' }




export const UIReducer = (state: UIState, action: UIType): UIState => {
  switch (action.type) {
    case '[UI] - OpenSidebar':
      return {
        ...state,
        sideMenuOpen: true

      }
    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false
      }
    case 'UI - changeStatusAddingEntry':
      return {
        ...state,
        isAddingEntry: action.payload
      }
    case 'UI - start dragging':
      return {
        ...state,
        isDragging: true
      }
    case 'UI - end dragging':
      return {
        ...state,
        isDragging: false
      }

    default:
      return state;
  }
}