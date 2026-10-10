import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 sm:px-6 lg:px-8">
        <div>
          <Link
            href="/"
            className="text-xl font-black text-slate-900"
          >
          
          </Link>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-sm leading-6 text-slate-500">
          
            <br />
            বাজার ও স্থানভেদে প্রকৃত দাম কিছুটা পরিবর্তিত হতে পারে।
          </p>
        </div>
      </div>

      
    </footer>
  );
}