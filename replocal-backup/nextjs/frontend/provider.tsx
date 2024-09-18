'use client'

import { useEffect, useState } from 'react'
import { createContext } from 'react'

import { Replocal_ClientDb } from '@/replocal-backup/core/types'

export const ReplocalContext = createContext<{ db: Replocal_ClientDb | null }>({
  db: null,
})

export default function ReplocalProvider({
  clientDb,
  children,
}: {
  clientDb: Replocal_ClientDb
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  // TODO - Detect if `clientDb` satisfies type `Replocal_ClientDb`

  useEffect(() => {
    clientDb.waitUntilReady().then(() => {
      setIsLoading(false)

      // TODO - Allow in some cases to delay registration
      clientDb.device.register()

      // TODO - Allow in some cases to delay syncing
      clientDb.sync()
    })
  }, [clientDb])

  if (isLoading) return null
  return (
    <ReplocalContext.Provider value={{ db: clientDb.database }}>
      {children}
    </ReplocalContext.Provider>
  )
}
