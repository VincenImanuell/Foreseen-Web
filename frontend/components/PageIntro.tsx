type PageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
  chips?: string[];
};

export function PageIntro({ eyebrow, title, body, chips = [] }: PageIntroProps) {
  return (
    <section className="surface-soft mb-6 p-5">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{body}</p>
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span key={chip} className="chip">
              {chip}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
