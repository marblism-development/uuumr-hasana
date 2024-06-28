'use client'

import { UserProvider } from '@/core/context'
import { TRPCProvider } from '@/core/trpc'
import { DesignSystemProvider } from '@/designSystem'
import { SessionProvider } from 'next-auth/react'

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <DesignSystemProvider name="Hasana">
      <SessionProvider>
        <TRPCProvider>
          <UserProvider>{children}</UserProvider>
        </TRPCProvider>
      </SessionProvider>
    </DesignSystemProvider>
  )
}
