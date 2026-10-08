export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6faf7]">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="skeleton-box h-4 w-24 rounded" />

          <div className="mt-6 flex items-center gap-4">
            <div className="skeleton-box h-16 w-16 rounded-2xl" />

            <div>
              <div className="skeleton-box h-4 w-20 rounded" />

              <div className="skeleton-box mt-3 h-9 w-40 rounded" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4">
          <div className="skeleton-box h-8 w-28 rounded" />
          <div className="skeleton-box h-10 w-44 rounded-xl" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-4"
            >
              <div className="skeleton-box h-16 w-16 rounded-2xl" />

              <div className="skeleton-box mt-5 h-5 w-28 rounded" />

              <div className="skeleton-box mt-2 h-4 w-16 rounded" />

              <div className="skeleton-box mt-5 h-7 w-32 rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}