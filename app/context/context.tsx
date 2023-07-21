"use client"
import { StoreContextWrapper } from '@/store';
import { GlobalStateType, globalState } from '@/store/state';
import React, { useReducer } from 'react'
interface IProps {
  children: React.ReactNode;
}

export default function Context({ children }: IProps) {
  const [state, dispatch] = useReducer((s: GlobalStateType, newValue: Partial<GlobalStateType>) => ({...s, ...newValue}), globalState)
  return (
    <StoreContextWrapper.Provider value={{state, dispatch}}>
      { children }
    </StoreContextWrapper.Provider>
  )
}
