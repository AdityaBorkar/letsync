import { NextRequest } from 'next/server'

export default async function cacheDelete(request: NextRequest) {
  const params = await request.json()
  console.log('cacheDelete REQUEST RECEIVED WITH BODY: ', params)

  const response = {
    ack: true,
  }
}
