import { PGliteInterface } from '@electric-sql/pglite'

import type { ReplocalConfig } from '../../core/types'

export default async function initDb(options: {
  pg: PGliteInterface
  schema: ReplocalConfig['localDb']['schema']
}) {
  const { pg, schema } = options

  // TODO - LastActive, Cursor Position, Typing Indicator

  // TODO - Extend Database Schema according to user's needs
  // TODO - Migrate Schema on (Replocal Schema) update / user's extend needs

  await pg
    .query(
      `CREATE TABLE IF NOT EXISTS devices (
        deviceId TEXT PRIMARY KEY,
        userId TEXT NOT NULL,
        schemaVersion INTEGER NOT NULL,
        state TEXT
       )`,
    )
    .catch((err) => {
      console.error('Error creating `devices` table: ', err)
    })
  await pg
    .query(
      `CREATE TABLE IF NOT EXISTS schemas (
        version INTEGER PRIMARY KEY,
        createdAt TIMESTAMP NOT NULL,
        schema TEXT NOT NULL
       )`,
    )
    .catch((err) => {
      console.error('Error creating `schemas` table: ', err)
    })
  await pg
    .query(
      `CREATE TABLE IF NOT EXISTS cache (
        cacheId TEXT PRIMARY KEY,
        createdAt TIMESTAMP NOT NULL,
        updatedAt TIMESTAMP NOT NULL,
        query TEXT NOT NULL,
        storageUrl TEXT NOT NULL
       )`,
    )
    .catch((err) => {
      console.error('Error creating `cache` table: ', err)
    })
}
