import LoadingCard from "@/components/LoadingCard";

export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="skeleton-box h-10 w-48 rounded-xl" />

      <div className="skeleton-box mt-3 h-5 w-72 rounded" />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingCard key={index} />
        ))}
      </div>
    </main>
  );
}