type PageIntroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export function PageIntro({ eyebrow, title, body }: PageIntroProps) {
  return (
    <section className="mb-6">
      <div className="eyebrow">{eyebrow}</div>
      <h1 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">{body}</p>
    </section>
  );
}
