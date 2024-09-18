import { createId } from '@paralleldrive/cuid2'

import type { Params } from '../handlers'
import getLatestSchema from '../utils/getLatestSchema'

export default async function deviceRegister(params: Params) {
  const { userId } = params.auth

  const schema = await getLatestSchema() // TODO - FROM DATABASE CACHE
  const device = {
    userId,
    state: null,
    deviceId: createId(),
    schemaVersion: schema.version,
  }
  const result = 'CREATE ${deviceId}'

  // TODO - Assign Cookie

  const response = { device, schema }
  return new Response(JSON.stringify(response), { status: 200 })
}
