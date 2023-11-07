'use client'

import { AuthProviders } from './AuthProviders'
import QueryProvider from './QueryProvider'
import { AppContextProvider } from './appContext'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProviders>
      <QueryProvider>
        <AppContextProvider>{children}</AppContextProvider>
      </QueryProvider>
    </AuthProviders>
  )
}

export default Providers
