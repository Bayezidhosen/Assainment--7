export default function LoadingCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="skeleton-box h-14 w-14 rounded-xl" />

      <div className="mt-4">
        <div className="skeleton-box h-4 w-3/4 rounded" />
        <div className="skeleton-box mt-2 h-3 w-1/2 rounded" />
      </div>

      <div className="mt-5 flex justify-between">
        <div>
          <div className="skeleton-box h-3 w-16 rounded" />
          <div className="skeleton-box mt-2 h-5 w-24 rounded" />
        </div>

        <div className="skeleton-box h-6 w-14 rounded-full" />
      </div>
    </div>
  );
}