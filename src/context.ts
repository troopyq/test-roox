import React from 'react'

export type GlobalContent = {
  state: any
  setState:(state: any) => void
}
export const Context = React.createContext<GlobalContent>({
state: {}, // set a default value
setState: () => {},
})
export const useGlobalContext = () => React.useContext(Context)