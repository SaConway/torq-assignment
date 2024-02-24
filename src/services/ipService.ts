import { IPInfo } from '../types'
import { getTimeFromTimezone } from '../utils'

async function lookupIP(ip: string): Promise<IPInfo> {
  const url = `http://ip-api.com/json/${ip}`

  const res = await fetch(url)
  const data = await res.json()

  if (data.status === 'fail') throw new Error('Invalid IP')

  return {
    ip: data.query,
    country: data.country,
    timezone: data.timezone,
    time: getTimeFromTimezone(data.timezone)
  }
}

export default {
  lookupIP
}
