export type ReplocalConfig = {
  auth: 'cookies'
  transport?: 'http' | 'ws' | 'mqtt'
  localDb: {
    /**
     * Extends the schema structure for local database
     */
    schema?: {
      devices?: string
      schemas?: string
      cache?: string
    }
  }
}

export type Replocal_ClientDb = {
  database: any
  waitUntilReady: () => Promise<boolean>
  events: {
    subscribe: (event: string, callback: (data: any) => void) => void
    unsubscribe: (event: string, callback: (data: any) => void) => void
  }
  device: {
    register: () => void
    deregister: () => void
  }
  schema: {
    validate: (schema: any) => void
    migrate: (schema: any) => void
    // extend: (schema: any) => void
  }
  pull: () => void
  push: () => void
  sync: () => void
}

export type Replocal_ServerDb = {}
