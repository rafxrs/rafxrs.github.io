import { useEffect, useState } from 'react'

const TYPE_MS = 55
const DELETE_MS = 28
const HOLD_MS = 2200
const GAP_MS = 350

interface TypewriterState {
  index: number
  text: string
  phase: 'hold' | 'delete' | 'type'
}

/**
 * Types, holds, and deletes each word in turn. Starts with the first word fully shown, so the
 * prerendered HTML is complete and readable before JavaScript runs.
 */
export function useTypewriter(words: readonly string[], running: boolean): TypewriterState {
  const [state, setState] = useState<TypewriterState>({
    index: 0,
    text: words[0] ?? '',
    phase: 'hold',
  })

  useEffect(() => {
    if (!running || words.length < 2) return

    const { index, text, phase } = state
    let next: TypewriterState
    let delay: number

    if (phase === 'hold') {
      next = { index, text, phase: 'delete' }
      delay = HOLD_MS
    } else if (phase === 'delete') {
      next =
        text.length > 0
          ? { index, text: text.slice(0, -1), phase }
          : { index: (index + 1) % words.length, text: '', phase: 'type' }
      delay = text.length > 0 ? DELETE_MS : GAP_MS
    } else {
      const word = words[index]
      const typed = word.slice(0, text.length + 1)
      next = { index, text: typed, phase: typed === word ? 'hold' : 'type' }
      delay = TYPE_MS
    }

    const timer = window.setTimeout(() => setState(next), delay)
    return () => window.clearTimeout(timer)
  }, [state, running, words])

  return state
}
