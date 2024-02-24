import { describe, it, expect, vi } from 'vitest'
import ipService from './ipService'

describe('IP Service', () => {
  describe('lookupIP', () => {
    it('should return the IP information', async () => {
      // Mock the date to always return the same time
      const date = new Date(1998, 11, 19)
      vi.useFakeTimers()
      vi.setSystemTime(date)

      const ip = '1.1.1.1'
      const result = await ipService.lookupIP(ip)
      const expected = {
        ip,
        country: 'Australia',
        timezone: 'Australia/Brisbane',
        time: '08:00:00'
      }

      expect(result).toEqual(expected)

      // Restore the original date implementation
      vi.useRealTimers()
    })
  })

  it('should throw an error if the IP is invalid', async () => {
    const ip = 'invalid'
    await expect(ipService.lookupIP(ip)).rejects.toThrow('Invalid IP')
  })
})
