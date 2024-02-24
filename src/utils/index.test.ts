import { describe, it, expect } from 'vitest'
import { getTimeFromTimezone, isValidIP } from './index'

describe('Utils', () => {
  describe('getTimeFromTimezone', () => {
    it('should return the current time in the specified timezone', () => {
      const timeZone = 'America/New_York'
      const result = getTimeFromTimezone(timeZone)
      const expectedFormat = /^\d{2}:\d{2}:\d{2}$/ // Matches format HH:MM:SS

      expect(result).toMatch(expectedFormat)
    })

    it('should throw an error if the timezone is invalid', () => {
      const timeZone = 'Invalid/Timezone'
      expect(() => getTimeFromTimezone(timeZone)).toThrow('Invalid time zone')
    })
  })

  describe('isValidIP', () => {
    it('should return true if the IP is valid', () => {
      expect(isValidIP('115.42.150.37')).toBe(true)
      expect(isValidIP('192.168.0.1')).toBe(true)
      expect(isValidIP('110.234.52.124')).toBe(true)
    })

    it('should return false if the IP is invalid', () => {
      expect(isValidIP('a.b.c.d')).toBe(false)
      expect(isValidIP('210.110')).toBe(false)
      expect(isValidIP('255')).toBe(false)
      expect(isValidIP('255.0.0.y')).toBe(false)
      expect(isValidIP('256.0.0.1')).toBe(false)
      expect(isValidIP('192.168.1.300')).toBe(false)
      expect(isValidIP('192.168.1')).toBe(false)
      expect(isValidIP('192.168.1.1.1')).toBe(false)
    })
  })
})
