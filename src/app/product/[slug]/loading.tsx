export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f6faf7]">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="skeleton-box h-5 w-28 rounded" />

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="skeleton-box h-80 rounded-3xl" />

            <div>
              <div className="skeleton-box h-4 w-24 rounded" />
              <div className="skeleton-box mt-4 h-10 w-64 rounded" />
              <div className="skeleton-box mt-3 h-5 w-80 rounded" />

              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="skeleton-box h-24 rounded-2xl" />
                <div className="skeleton-box h-24 rounded-2xl" />
                <div className="skeleton-box h-24 rounded-2xl" />
              </div>

              <div className="skeleton-box mt-8 h-32 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}