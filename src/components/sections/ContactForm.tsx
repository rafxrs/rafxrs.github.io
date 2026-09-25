import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { contactLinks } from '../../data/content'
import { cn } from '../../lib/cn'
import {
  MESSAGE_MIN_LENGTH,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '../../lib/validation'
import { buttonClasses } from '../ui/buttonStyles'
import { AlertIcon, ArrowRightIcon, CheckIcon, SpinnerIcon } from '../ui/Icons'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const FIELDS: ContactField[] = ['name', 'email', 'message']
const EMPTY: ContactValues = { name: '', email: '', message: '' }

const inputClasses =
  'block w-full rounded-lg border bg-canvas/70 px-3.5 py-2.5 text-[15px] text-fg transition-[border-color,box-shadow] duration-150 focus-visible:border-accent-strong focus-visible:ring-4 focus-visible:ring-accent-strong/25 focus-visible:outline-none'

/**
 * Contact form posting to Formspree. Fields validate once touched and then as you type; on
 * submit, focus moves to the first invalid field. `_gotcha` is Formspree's honeypot: real
 * visitors never see it, and submissions that fill it in are dropped.
 */
export function ContactForm({ endpoint }: { endpoint: string }) {
  const id = useId()
  const [values, setValues] = useState<ContactValues>(EMPTY)
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverMessage, setServerMessage] = useState<string | null>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const errors: ContactErrors = validateContact(values)
  const shownError = (field: ContactField) => (touched[field] ? errors[field] : undefined)
  const fieldId = (field: string) => `${id}-${field}`

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status === 'success' || status === 'error') statusRef.current?.focus()
  }, [status])

  const update = (field: ContactField) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((current) => ({ ...current, [field]: event.target.value }))

  const touch = (field: ContactField) => () => setTouched((current) => ({ ...current, [field]: true }))

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting') return

    setTouched({ name: true, email: true, message: true })
    const firstInvalid = FIELDS.find((field) => errors[field])
    if (firstInvalid) {
      ;({ name: nameRef, email: emailRef, message: messageRef })[firstInvalid].current?.focus()
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    if (String(data.get('_gotcha') ?? '').trim()) {
      setStatus('success') // Honeypot filled: quietly drop it.
      return
    }

    setStatus('submitting')
    setServerMessage(null)
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (response.ok) {
        form.reset()
        setValues(EMPTY)
        setTouched({})
        setStatus('success')
        return
      }
      const body: { errors?: { message?: string }[] } | null = await response.json().catch(() => null)
      setServerMessage(body?.errors?.map((error) => error.message).filter(Boolean).join(' ') || null)
      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-2xl border border-positive/25 bg-positive/[0.05] p-8"
      >
        <span className="grid size-10 place-items-center rounded-full bg-positive/15 text-positive">
          <CheckIcon className="size-5" />
        </span>
        <p className="mt-5 text-xl font-semibold tracking-tight text-fg">Thanks — your message was sent.</p>
        <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">I’ll reply to the email address you gave.</p>
        <button type="button" onClick={() => setStatus('idle')} className={buttonClasses('secondary', 'sm', 'mt-6')}>
          Send another message
        </button>
      </div>
    )
  }

  const messageLength = values.message.trim().length

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={`${id}-required-note`}
      className="relative rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <p id={`${id}-required-note`} className="text-xs text-fg-subtle">
        All fields are required.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id={fieldId('name')} label="Name" error={shownError('name')}>
          <input
            ref={nameRef}
            id={fieldId('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={update('name')}
            onBlur={touch('name')}
            aria-invalid={Boolean(shownError('name'))}
            aria-describedby={shownError('name') ? `${fieldId('name')}-error` : undefined}
            className={cn(inputClasses, shownError('name') ? 'border-negative/70' : 'border-line-strong')}
          />
        </Field>

        <Field id={fieldId('email')} label="Email" error={shownError('email')}>
          <input
            ref={emailRef}
            id={fieldId('email')}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={update('email')}
            onBlur={touch('email')}
            aria-invalid={Boolean(shownError('email'))}
            aria-describedby={shownError('email') ? `${fieldId('email')}-error` : undefined}
            className={cn(inputClasses, shownError('email') ? 'border-negative/70' : 'border-line-strong')}
          />
        </Field>

        <Field
          id={fieldId('message')}
          label="Message"
          error={shownError('message')}
          className="sm:col-span-2"
          hint={
            messageLength < MESSAGE_MIN_LENGTH
              ? `${messageLength} / ${MESSAGE_MIN_LENGTH} characters minimum`
              : `${messageLength} characters`
          }
        >
          <textarea
            ref={messageRef}
            id={fieldId('message')}
            name="message"
            rows={6}
            required
            value={values.message}
            onChange={update('message')}
            onBlur={touch('message')}
            aria-invalid={Boolean(shownError('message'))}
            aria-describedby={cn(
              `${fieldId('message')}-hint`,
              shownError('message') && `${fieldId('message')}-error`,
            )}
            className={cn(
              inputClasses,
              'min-h-36 resize-y leading-relaxed',
              shownError('message') ? 'border-negative/70' : 'border-line-strong',
            )}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots that fill it get dropped. */}
      <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor={fieldId('gotcha')}>Leave this field empty</label>
        <input id={fieldId('gotcha')} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="_subject" value="New message from the portfolio contact form" />

      {status === 'error' && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex gap-3 rounded-lg border border-negative/30 bg-negative/[0.06] p-4 text-sm leading-relaxed text-fg"
        >
          <AlertIcon className="mt-0.5 size-4 shrink-0 text-negative" />
          <p>
            Your message couldn’t be sent.{serverMessage ? ` ${serverMessage}` : ''} Please try again, or email me
            directly at{' '}
            <a
              href={`mailto:${contactLinks.email}`}
              className="font-medium text-accent underline underline-offset-4"
            >
              {contactLinks.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
        <button type="submit" disabled={status === 'submitting'} className={buttonClasses('primary', 'md', 'group')}>
          {status === 'submitting' ? (
            <>
              <SpinnerIcon className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p aria-live="polite" className="sr-only">
          {status === 'submitting' ? 'Sending your message…' : ''}
        </p>
      </div>
    </form>
  )
}

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}

function Field({ id, label, error, hint, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-fg">
        {label}
      </label>
      {children}
      <div className="mt-2 flex flex-wrap items-start justify-between gap-x-4 gap-y-1 text-xs">
        {error ? (
          <p id={`${id}-error`} className="flex items-start gap-1.5 text-negative">
            <AlertIcon className="mt-px size-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          <span />
        )}
        {hint && (
          <p id={`${id}-hint`} className="text-fg-subtle tabular-nums">
            {hint}
          </p>
        )}
      </div>
    </div>
  )
}
