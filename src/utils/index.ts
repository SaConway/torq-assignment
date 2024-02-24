function getTimeFromTimezone(timeZone: string): string {
  const options: Intl.DateTimeFormatOptions = { timeZone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

  return new Date().toLocaleString([], options)
}

function isValidIP(ip: string): boolean {
  const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return regex.test(ip)
}

export { getTimeFromTimezone, isValidIP }
