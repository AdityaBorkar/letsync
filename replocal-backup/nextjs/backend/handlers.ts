import type { NextRequest } from 'next/server'

import { ReplocalConfig } from '@/replocal-backup/core/types'

import Auth from './auth'
import Router from './router'

export type Params = {
  request: NextRequest
  config: ReplocalConfig
  auth: {
    userId: string
    deviceId: string
  }
}

export type NextContext = { params: { slug: string[] } }

export default function handlers(config: ReplocalConfig) {
  return {
    async GET(request: NextRequest, context: NextContext) {
      const func = Router({ context, method: 'GET' })
      const auth = Auth(request)
      const params = { request, auth, config }
      return await func(params)
    },
    async POST(request: NextRequest, context: NextContext) {
      const func = Router({ context, method: 'POST' })
      const auth = Auth(request)
      const params = { request, auth, config }
      return await func(params)
    },
    async DELETE(request: NextRequest, context: NextContext) {
      const func = Router({ context, method: 'DELETE' })
      const auth = Auth(request)
      const params = { request, auth, config }
      return await func(params)
    },
  }
}
