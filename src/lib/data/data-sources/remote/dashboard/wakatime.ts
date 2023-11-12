import { WAKATIME_API_KEY } from '@lib/data/data-sources/remote/remote-constants'

import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/data/core/api_response'

export async function getWakatimeStats() {
  console.log('GET /api/dashboard/wakatime')

  if (WAKATIME_API_KEY == null) {
    createFailureResponse('API Wakatime key is missing', 'UNKNOWN')
  }

  try {
    const buff = Buffer.from(WAKATIME_API_KEY)
    const base64data = buff.toString('base64')

    const res = await fetch(
      'https://wakatime.com/api/v1/users/current/all_time_since_today',
      {
        headers: {
          Authorization: `Basic ${base64data}`
        }
      }
    )
    const { data } = await res.json()

    return createSuccessResponse(data)
  } catch (err) {
    console.log(err)
    return createFailureResponse(
      'Something went wrong with Wakatime',
      'UNKNOWN'
    )
  }
}
