'use client'

import { AuthProviders } from './AuthProviders'
import QueryProvider from './QueryProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProviders>
      <QueryProvider>{children}</QueryProvider>
    </AuthProviders>
  )
}

export default Providers
