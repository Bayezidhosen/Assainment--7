import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 lg:px-8">
        {/* Left */}
        <div>
          <Link
            href="/"
            className="text-xl font-extrabold text-slate-900"
          >
            🛒 বাজার দর
          </Link>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        {/* Right */}
        <div className="md:text-right">
          <p className="text-sm leading-6 text-slate-500">
            তথ্যগুলো বিভিন্ন উৎস থেকে সংগৃহীত।
            <br />
            বাজার ও স্থানভেদে প্রকৃত দাম কিছুটা পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © ২০২৬ বাজার দর — BazarDor
      </div>
    </footer>
  );
}