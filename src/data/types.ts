/**
 * Shapes for src/data/content.ts.
 *
 * Optional fields can simply be deleted: every component hides the UI element whose data is
 * missing, so the site never renders placeholder text, empty sections, or dead links.
 */

/** An in-page anchor (e.g. "#research") or an absolute https:// / mailto: URL. */
export type Href = string

export interface Site {
  /** Public URL of the deployed site, without a trailing slash. */
  url: string
  /** Browser-tab and social-card title. */
  title: string
  /** Search and social-card description. Aim for 160 characters or fewer. */
  description: string
  /** Repository holding this site's source code (linked from the footer). */
  sourceRepo: Href
}

export interface Profile {
  name: string
  /** Shown in the navbar monogram. */
  initials: string
  role: string
  affiliation: string
  location: string
  /** Availability badge text. Delete to hide the badge. */
  availability?: string
  /** Cycled by the typing animation in the hero. */
  focusAreas: string[]
  pitch: string
  /** CV path inside /public. The CV buttons stay hidden until this file exists. */
  cv?: string
}

export interface ContactLinks {
  github: Href
  linkedin: Href
  email: string
}

export interface NavItem {
  label: string
  /** Id of the section to scroll to. */
  sectionId: string
}

export interface SectionCopy {
  /** Small label above the heading. */
  eyebrow?: string
  title: string
  intro?: string
}

export interface Highlight {
  /** Headline figure or phrase, set in large type. */
  value: string
  /** Smaller words that complete the value, e.g. "research & industry teams". */
  unit?: string
  caption: string
  /** Where the evidence lives. */
  link?: { href: Href; label: string }
}

/** Motif drawn in a media slot while its file is still missing from /public. */
export type PlaceholderMotif = 'chessboard' | 'grid'

interface MediaBase {
  alt: string
  /** Intrinsic size in px. Reserves space so the layout doesn't shift while media loads. */
  width?: number
  height?: number
  caption?: string
  placeholder?: PlaceholderMotif
}

export interface ImageMedia extends MediaBase {
  kind: 'image'
  /**
   * Path inside /public, e.g. "/media/plot.webp". Until the file exists, a clearly marked
   * placeholder slot is rendered instead of a broken image.
   */
  src: string
  /** Larger or original version, opened in a new tab. */
  fullSize?: string
  /** Colour behind the image, for figures with a solid background. */
  background?: string
}

export interface VideoSource {
  /** Path inside /public, e.g. "/media/demo.mp4". */
  src: string
  /** MIME type, ideally with codecs, e.g. 'video/webm; codecs="vp9"' or "video/mp4". */
  type: string
}

export interface VideoMedia extends MediaBase {
  kind: 'video'
  /** Browsers play the first source they support, so list the smallest format first. */
  sources: VideoSource[]
  /**
   * Still frame (path inside /public) shown before playback, to reduced-motion visitors, and
   * wherever no source can play. Until it exists, a placeholder slot is rendered.
   */
  poster: string
  /** Second to start playback from, so the first frame matches the poster. */
  startAt?: number
}

/**
 * Media shown in a project card. To add an interactive in-browser demo later (e.g. an ONNX
 * model via onnxruntime-web), add a new `kind` here and a matching case in MediaSlot.tsx.
 */
export type Media = ImageMedia | VideoMedia

export interface ProjectLink {
  label: string
  href: Href
  icon: 'github' | 'package' | 'external'
}

export interface KeyStat {
  value: string
  label: string
}

export interface IterationStep {
  /** Name of the run or phase. */
  step: string
  /** What changed. */
  change: string
  /** What happened. */
  outcome: string
  verdict: 'negative' | 'control' | 'positive'
}

export interface EvalRow {
  opponent: string
  note?: string
  wins: number
  losses: number
  ties: number
  games: number
  /** Win rate in percent, as reported. */
  winRate: number
  /** Reported 95% confidence interval, in percent. */
  ci95: [low: number, high: number]
}

export interface EvalTable {
  caption: string
  rows: EvalRow[]
}

/** The structured write-up behind a project's "Details" toggle. */
export interface ProjectDetails {
  problem: string
  approach: string[]
  /** Rendered as a timeline: the experimental process, including what didn't work. */
  iterations?: IterationStep[]
  results?: string[]
  resultsTable?: EvalTable
  resultsFigure?: ImageMedia
  limitations?: string[]
}

export interface Project {
  /** Anchor and element ids are derived from this: #project-<id>. */
  id: string
  title: string
  /** Small label above the title. */
  kicker?: string
  /** Where and when the work happened. */
  context?: string
  summary: string
  tags: string[]
  links?: ProjectLink[]
  /** Shows a "Research · code not public" label in place of a repo button. */
  codeNotPublic?: boolean
  media?: Media
  /** Headline numbers shown on the card itself. */
  keyStats?: KeyStat[]
  /** Headline finding shown on the card itself, for work without shareable numbers. */
  keyResult?: { text: string; note?: string }
  details: ProjectDetails
}

export interface ResearchHighlight {
  framing: string
  role: string
  org: string
  dates: string
  stat?: KeyStat
  points: string[]
  tags: string[]
  codeNotPublic?: boolean
}

export interface ExperienceEntry {
  kind: 'education' | 'research' | 'industry' | 'teaching'
  role: string
  org: string
  location?: string
  dates: string
  points?: string[]
  link?: { href: Href; label: string }
}

export interface SkillGroup {
  title: string
  items: string[]
}

export interface SpokenLanguage {
  language: string
  level: string
}

export interface About {
  paragraphs: string[]
  languages: SpokenLanguage[]
}

export interface OtherWorkItem {
  title: string
  description?: string
  href?: Href
}
