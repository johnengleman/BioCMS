import React, { createContext, useState } from 'react'

type ChurchContextType = {
  selectedChurch: string
  setSelectedChurch: React.Dispatch<
    React.SetStateAction<string>
  >
}

type ChurchProviderProps = {
  children: React.ReactNode
}

const defaultContextValue: ChurchContextType = {
  selectedChurch: '',
  setSelectedChurch: () => {},
}

const ChurchContext = createContext<ChurchContextType>(
  defaultContextValue,
)

const ChurchProvider = ({
  children,
}: ChurchProviderProps): React.JSX.Element => {
  const [selectedChurch, setSelectedChurch] =
    useState('All')

  return (
    <ChurchContext.Provider
      value={{ selectedChurch, setSelectedChurch }}
    >
      {children}
    </ChurchContext.Provider>
  )
}

export { ChurchProvider, ChurchContext }
