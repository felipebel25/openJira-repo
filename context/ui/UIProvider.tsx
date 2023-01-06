import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, UIReducer } from './';
export interface UIState {
     sideMenuOpen: boolean;
     isAddingEntry: boolean;
     isDragging: boolean;
}
export const UI_INITIAL_STATE: UIState = {
     sideMenuOpen: false,
     isAddingEntry: false,
     isDragging: false,
}
export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
     const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

     const openSideMenu = () => dispatch({ type: "[UI] - OpenSidebar" })
     const closeSideMenu = () => dispatch({ type: "UI - Close Sidebar" })
     const setIsAddingEntry = (status: boolean) => dispatch({ type: 'UI - changeStatusAddingEntry', payload: status })
     const startDragging = () => {
          dispatch({ type: 'UI - start dragging' })
     }

     const endDragging = () => {
          dispatch({ type: 'UI - end dragging' })
     }
     return (
          <UIContext.Provider
               value={{
                    ...state,
                    openSideMenu,
                    closeSideMenu,
                    setIsAddingEntry,
                    startDragging,
                    endDragging
               }}
          >
               {children}
          </UIContext.Provider>
     )
}