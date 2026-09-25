import { describe, expect, it } from 'vitest'
import { MESSAGE_MIN_LENGTH, validateContact, validateField } from './validation'

const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'x'.repeat(MESSAGE_MIN_LENGTH) }

describe('validateField', () => {
  it('requires every field', () => {
    expect(validateField('name', '   ')).toMatch(/name/i)
    expect(validateField('email', '')).toMatch(/email/i)
    expect(validateField('message', '')).toMatch(/message/i)
  })

  it.each(['ada@example.com', 'first.last+tag@sub.example.co.uk'])('accepts %s', (email) => {
    expect(validateField('email', email)).toBeUndefined()
  })

  it.each(['ada', 'ada@', 'ada@example', 'ada@example.c', 'ada lovelace@example.com', '@example.com'])(
    'rejects %s',
    (email) => {
      expect(validateField('email', email)).toMatch(/valid email/i)
    },
  )

  it('enforces the minimum message length on trimmed text', () => {
    const short = ' '.repeat(10) + 'x'.repeat(MESSAGE_MIN_LENGTH - 1)
    expect(validateField('message', short)).toMatch(new RegExp(`at least ${MESSAGE_MIN_LENGTH}`))
    expect(validateField('message', 'x'.repeat(MESSAGE_MIN_LENGTH))).toBeUndefined()
  })
})

describe('validateContact', () => {
  it('returns no errors for a valid message', () => {
    expect(validateContact(valid)).toEqual({})
  })

  it('reports each invalid field', () => {
    expect(Object.keys(validateContact({ name: '', email: 'nope', message: 'hi' })).sort()).toEqual([
      'email',
      'message',
      'name',
    ])
  })
})
