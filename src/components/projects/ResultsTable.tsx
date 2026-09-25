import type { EvalRow, EvalTable } from '../../data/types'

/** Win-rate axis shared by every row's interval plot. 50% is an even record. */
const DOMAIN: [number, number] = [50, 100]

const toPercent = (value: number) => ((value - DOMAIN[0]) / (DOMAIN[1] - DOMAIN[0])) * 100

/**
 * Evaluation results as a real table (the accessible source of every number), with a small
 * interval plot per row: dot = win rate, bar = 95% CI, left edge = 50%. The plot repeats what the
 * text says, so it's hidden from screen readers and dropped on narrow screens.
 */
export function ResultsTable({ table, id }: { table: EvalTable; id: string }) {
  const captionId = `${id}-caption`
  return (
    <div
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
      className="overflow-x-auto rounded-xl border border-line bg-canvas/40"
    >
      <table className="w-full text-left text-[13px] sm:text-sm">
        <caption id={captionId} className="border-b border-line px-4 py-3 text-left text-xs leading-relaxed text-fg-subtle">
          {table.caption}
        </caption>
        <thead>
          <tr className="border-b border-line text-xs text-fg-subtle">
            <th scope="col" className="py-2.5 pr-2 pl-3 font-medium sm:px-4">
              Opponent
            </th>
            <th scope="col" className="px-2 py-2.5 text-right font-medium whitespace-nowrap sm:px-3">
              W–L–T
            </th>
            <th scope="col" className="hidden px-2 py-2.5 text-right font-medium sm:table-cell sm:px-3">
              Games
            </th>
            <th scope="col" className="py-2.5 pr-3 pl-2 font-medium sm:pr-4 sm:pl-3">
              <div className="flex items-end gap-5">
                <span className="sm:w-32">Win rate (95% CI)</span>
                <span aria-hidden="true" className="relative hidden h-4 w-36 font-mono text-[10px] sm:block">
                  <span className="absolute bottom-0 left-0 -translate-x-1/2">50%</span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2">75%</span>
                  <span className="absolute right-0 bottom-0 translate-x-1/2">100%</span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.opponent} className="group border-b border-line last:border-0">
              <th scope="row" className="py-3 pr-2 pl-3 align-top font-medium text-fg sm:px-4">
                {row.opponent}
                {row.note && <span className="mt-0.5 block text-xs font-normal text-fg-subtle">{row.note}</span>}
              </th>
              <td className="px-2 py-3 text-right align-top whitespace-nowrap text-fg-muted tabular-nums sm:px-3">
                {row.wins}–{row.losses}–{row.ties}
                {/* Phones: the game count moves here instead of its own column. */}
                <span className="block text-xs text-fg-subtle sm:hidden">{row.games} games</span>
              </td>
              <td className="hidden px-2 py-3 text-right align-top text-fg-muted tabular-nums sm:table-cell sm:px-3">
                {row.games}
              </td>
              <td className="py-3 pr-3 pl-2 align-top sm:pr-4 sm:pl-3">
                <div className="flex items-center gap-5">
                  <span className="whitespace-nowrap text-fg tabular-nums sm:w-32">
                    <span className="block font-semibold sm:inline">{row.winRate}%</span>{' '}
                    <span className="block text-fg-subtle sm:inline">
                      ({row.ci95[0]}–{row.ci95[1]}%)
                    </span>
                  </span>
                  <IntervalPlot row={row} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function IntervalPlot({ row }: { row: EvalRow }) {
  const low = toPercent(row.ci95[0])
  const high = toPercent(row.ci95[1])
  const point = toPercent(row.winRate)
  return (
    <span aria-hidden="true" className="relative hidden h-5 w-36 shrink-0 sm:block">
      {/* Recessive hairline grid: 50% (even record), 75%, 100%. */}
      <span className="absolute inset-y-0 left-0 w-px bg-white/15" />
      <span className="absolute inset-y-1 left-1/2 w-px bg-white/[0.07]" />
      <span className="absolute inset-y-1 right-0 w-px bg-white/[0.07]" />
      {/* 95% confidence interval */}
      <span
        className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-accent-strong transition-colors group-hover:bg-accent"
        style={{ left: `${low}%`, width: `${high - low}%` }}
      />
      {/* Reported win rate, with a surface-coloured ring */}
      <span
        className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong ring-2 ring-surface transition-colors group-hover:bg-accent"
        style={{ left: `${point}%` }}
      />
    </span>
  )
}
