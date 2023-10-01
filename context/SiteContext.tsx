import React, { createContext, useState } from 'react'

type SiteContextType = {
  selectedChurch: string
  setSelectedChurch: React.Dispatch<
    React.SetStateAction<string>
  >
}

type SiteProviderProps = {
  children: React.ReactNode
}

const defaultContextValue: SiteContextType = {
  selectedChurch: 'all',
  setSelectedChurch: () => {},
}

const SiteContext = createContext<SiteContextType>(
  defaultContextValue,
)

const SiteProvider = ({
  children,
}: SiteProviderProps): React.JSX.Element => {
  const [selectedChurch, setSelectedChurch] =
    useState('all')

  return (
    <SiteContext.Provider
      value={{ selectedChurch, setSelectedChurch }}
    >
      {children}
    </SiteContext.Provider>
  )
}

export { SiteProvider, SiteContext }
