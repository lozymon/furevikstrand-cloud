// View-time PII redaction for the admin misses panel. Conservative on
// phones to avoid false positives on dates / IDs / tracking numbers.

const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
// Match only obvious phone shapes: explicit + country code, or parenthesised
// area code. Leaves bare digit runs alone.
const PHONE_RE = /(?:\+\d[\d\s().-]{7,}\d|\(\d{2,4}\)[\s.-]?\d{3}[\s.-]?\d{2,5})/g

export function redactPII(text: string): string {
  return text.replace(EMAIL_RE, '[email]').replace(PHONE_RE, '[phone]')
}
