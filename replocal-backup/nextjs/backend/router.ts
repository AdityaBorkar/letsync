import { notFound } from 'next/navigation'

import cacheDelete from './cache/delete'
import cacheRetrieve from './cache/retrieve'
import cacheUpsert from './cache/upsert'
import deviceInfo from './device/info'
import deviceRegister from './device/register'
import deviceUnregister from './device/unregister'

type NextContext = { params: { slug: string[] } }

const RestEndpoints = {
  GET: {
    '/cache': cacheRetrieve,
    // '/device': deviceInfo,
    // "/sync": () => {},
    // '/pull': () => {},
  },
  POST: {
    '/cache': cacheUpsert,
    '/device': deviceRegister,
    // "/sync": () => {},
    // "/push": () => {},
  },
  DELETE: {
    '/cache': cacheDelete,
    '/device': deviceUnregister,
  },
}

export default function Router({
  context,
  method,
}: {
  context: NextContext
  method: keyof typeof RestEndpoints
}) {
  const endpoints = RestEndpoints[method]
  const path = '/' + context.params.slug.join('/')
  const isValidPath = Object.keys(endpoints).includes(path)
  if (!isValidPath) return notFound()

  const func = endpoints[path]
  return func
}
