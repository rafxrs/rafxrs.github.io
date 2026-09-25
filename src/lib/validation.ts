export interface ContactValues {
  name: string
  email: string
  message: string
}

export type ContactField = keyof ContactValues
export type ContactErrors = Partial<Record<ContactField, string>>

export const MESSAGE_MIN_LENGTH = 20
export const MESSAGE_MAX_LENGTH = 5000
export const NAME_MAX_LENGTH = 100

// Deliberately permissive: one "@", no spaces, and a dot in the domain part.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateField(field: ContactField, rawValue: string): string | undefined {
  const value = rawValue.trim()
  switch (field) {
    case 'name':
      if (!value) return 'Please enter your name.'
      if (value.length > NAME_MAX_LENGTH) return `Please keep your name under ${NAME_MAX_LENGTH} characters.`
      return undefined
    case 'email':
      if (!value) return 'Please enter your email address.'
      if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address, like name@example.com.'
      return undefined
    case 'message':
      if (!value) return 'Please write a message.'
      if (value.length < MESSAGE_MIN_LENGTH) {
        return `Please write at least ${MESSAGE_MIN_LENGTH} characters (currently ${value.length}).`
      }
      if (value.length > MESSAGE_MAX_LENGTH) {
        return `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`
      }
      return undefined
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {}
  for (const field of Object.keys(values) as ContactField[]) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}
