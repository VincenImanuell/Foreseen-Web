import Link from "next/link";
import { Reveal } from "./Reveal";

const SIGNALS = [
  {
    label: "Lobby pressure",
    value: "Open seats",
    body: "See whether the table is quiet or crowded before you stake.",
  },
  {
    label: "Opponent signal",
    value: "Move tells",
    body: "Read distribution and post-win habits before committing blind.",
  },
  {
    label: "Clock state",
    value: "90 sec",
    body: "Deadline context stays visible during scouting and reveal windows.",
  },
];

const MOVES = ["Rock", "Paper", "Scissors"];
const MOVE_EMOJI = ["🪨", "📄", "✂️"];

export function LandingShowcase() {
  return (
    <section className="border-t border-white/5 px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="eyebrow text-center">Table intelligence</div>
          <h2 className="mt-2 text-center font-display text-3xl font-bold tracking-tight sm:text-4xl">
            The UI is built around reading the room.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-slate-400">
            Foreseen is still Rock Paper Scissors at the core, but the interface
            keeps the important signals close: lobby pressure, opponent tells,
            deadlines, and settlement state.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {SIGNALS.map((signal) => (
            <div key={signal.label} className="stat-card">
              <div className="text-xs text-slate-500">{signal.label}</div>
              <div className="mt-2 font-display text-xl font-bold text-white">
                {signal.value}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {signal.body}
              </p>
            </div>
          ))}
        </div>

        <div className="surface panel-grid mt-6 overflow-hidden p-5">
          <div className="flex items-center justify-between">
            <span className="eyebrow">Commit preview</span>
            <span className="chip">sealed move</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {MOVES.map((move, index) => (
              <div key={move} className="rounded-xl border border-white/10 bg-void/55 p-4">
                <div className="text-2xl">{MOVE_EMOJI[index]}</div>
                <div className="text-sm font-semibold text-slate-200">{move}</div>
                <div className="mt-2 h-2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/play" className="btn-primary">
            Enter the arena
          </Link>
        </div>
      </div>
    </section>
  );
}
