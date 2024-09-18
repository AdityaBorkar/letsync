import { NextRequest } from 'next/server'

export default async function cacheRetrieve(request: NextRequest) {
  const params = await request.json()
  console.log('cacheRetrieve REQUEST RECEIVED WITH BODY: ', params)

  const response = {
    ack: true,
  }
}
