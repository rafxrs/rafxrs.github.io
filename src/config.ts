/**
 * Contact form backend (Formspree — works on static hosts like GitHub Pages).
 *
 * 1. Create a free form at https://formspree.io (Sign up → New form).
 * 2. Copy the form ID from its endpoint, https://formspree.io/f/<FORM_ID> — e.g. "xyzabcde".
 * 3. Paste it below and redeploy.
 *
 * While this is empty the form stays hidden and visitors see the direct links (GitHub,
 * LinkedIn, email) instead, so the site never shows a form that can't send.
 */
export const FORMSPREE_FORM_ID = '' // TODO: paste your Formspree form ID here

export const FORMSPREE_ENDPOINT = FORMSPREE_FORM_ID ? `https://formspree.io/f/${FORMSPREE_FORM_ID}` : null
