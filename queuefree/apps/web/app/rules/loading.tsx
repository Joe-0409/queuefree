export default function RulesLoading() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <div className="max-w-3xl animate-pulse">
        <div className="h-4 w-32 rounded bg-slate-200" />
        <div className="mt-4 h-12 w-2/3 rounded bg-slate-200" />
        <div className="mt-4 h-5 w-full rounded bg-slate-100" />
        <div className="mt-2 h-5 w-5/6 rounded bg-slate-100" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
            <div className="h-5 w-24 rounded bg-slate-200" />
            <div className="mt-5 h-7 w-3/4 rounded bg-slate-200" />
            <div className="mt-4 h-4 w-full rounded bg-slate-100" />
            <div className="mt-2 h-4 w-11/12 rounded bg-slate-100" />
            <div className="mt-2 h-4 w-2/3 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </main>
  );
}
