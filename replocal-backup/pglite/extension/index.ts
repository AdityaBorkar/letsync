import type { Extension, PGliteInterface } from '@electric-sql/pglite'

import { ReplocalConfig } from '@/replocal-backup/core/types'

import initDb from './initDb'

export default function Extension(config: ReplocalConfig): Extension {
  return {
    name: 'Replocal Sync',
    async setup(pg: PGliteInterface) {
      return {
        init: () => initDb({ pg, schema: config.localDb.schema }),
        namespaceObj: { config },
      }
    },
  }
}
