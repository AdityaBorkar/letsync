import { PGlite } from '@electric-sql/pglite'

import { ReplocalConfig, Replocal_ClientDb } from '../../core/types'

type PGliteWithReplocal = PGlite & { replocal: { config: ReplocalConfig } }

export default function ClientDb(pg: PGliteWithReplocal): Replocal_ClientDb {
  // TODO - Connection Pooling on frontend

  const apiBaseUrl = 'http://localhost:3000/api/replocal'

  return {
    database: pg,
    waitUntilReady: async () =>
      new Promise((resolve, reject) => {
        pg.waitReady.then(() => {
          resolve(true)
          // TODO - SET GLOBAL CONFIG
        })
      }),
    events: {
      subscribe: (event: string, callback: (data: any) => void) => {},
      unsubscribe: (event: string, callback: (data: any) => void) => {},
    },
    device: {
      async register() {
        // TODO - isDeviceRegistered?
        // TODO - Validate Device ID
        const deviceId = '123'

        // CREATE, PAUSE, RESUME, ALTER, and CANCEL.
        // SHOW CHANGEFEED JOBS

        const { device, schema } = await fetch(`${apiBaseUrl}/device`, {
          method: 'POST',
        })
          .then((res) => res.json())
          .catch((err) => {
            console.error('register: ', err)
            throw err
          })

        pg.sql`INSERT INTO devices (id, name, created_at) VALUES (${deviceId}, ${device.name}, ${new Date()})`

        console.log('register: ', device)
      },
      async deregister() {
        const deviceId = '123' // TODO - isDeviceRegistered?

        const status = await fetch(`${apiBaseUrl}/device`, {
          method: 'DELETE',
          body: JSON.stringify({ deviceId }),
        })
          .then((res) => res.json())
          .catch((err) => {
            console.error('register: ', err)
            throw err
          })
      },
    },
    schema: {
      validate: (schema: any) => {},
      migrate: (schema: any) => {},
    },
    async pull() {},
    async push() {},
    async sync() {},
  }
}
