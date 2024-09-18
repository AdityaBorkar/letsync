import { NextRequest } from 'next/server'

export default async function cacheUpsert(request: NextRequest) {
  const params = await request.json()
  console.log('cacheUpsert REQUEST RECEIVED WITH BODY: ', params)

  const response = {
    ack: true,
  }
}
