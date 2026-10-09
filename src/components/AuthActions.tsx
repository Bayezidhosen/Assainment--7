// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// export default function AuthActions() {
//   const router = useRouter();

//   const { data: session, isPending } = authClient.useSession();

//   async function handleSignOut() {
//     await authClient.signOut();

//     router.refresh();
//     router.push("/");
//   }

//   if (isPending) {
//     return (
//       <div className="hidden items-center gap-2 sm:flex">
//         <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-100" />
//         <div className="h-9 w-20 animate-pulse rounded-xl bg-slate-100" />
//       </div>
//     );
//   }

//   if (!session?.user) {
//     return (
//       <div className="hidden items-center gap-2 sm:flex">
//         <Link
//           href="/signin"
//           className="rounded-xl px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
//         >
//           সাইন ইন
//         </Link>

//         <Link
//           href="/signup"
//           className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-green-700"
//         >
//           সাইন আপ
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="hidden items-center gap-3 sm:flex">
//       <Link
//         href="/profile"
//         className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-green-50"
//       >
//         <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
//           {(session.user.name || session.user.email || "U")
//             .charAt(0)
//             .toUpperCase()}
//         </div>

//         <div className="max-w-32">
//           <p className="truncate text-sm font-bold text-slate-800">
//             {session.user.name || "User"}
//           </p>

//           <p className="truncate text-xs text-slate-400">
//             {session.user.email}
//           </p>
//         </div>
//       </Link>

//       <button
//         type="button"
//         onClick={handleSignOut}
//         className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
//       >
//         সাইন আউট
//       </button>
//     </div>
//   );
// }



"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function AuthActions() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message || "লগআউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে!");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে");
    }
  }

  if (isPending) {
    return (
      <div className="flex items-center gap-2">
        <div className="skeleton h-9 w-20 rounded-xl" />
        <div className="skeleton h-9 w-9 rounded-xl" />
      </div>
    );
  }

  const user = session?.user;

  return (
    <>
      {/* Desktop Authentication */}
      <div className="hidden items-center gap-3 sm:flex">
        {!user ? (
          <>
            <Link
              href="/signin"
              className="rounded-xl px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              সাইন ইন
            </Link>

            <Link
              href="/signup"
              className="rounded-xl bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
            >
              সাইন আপ
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/profile"
              className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-green-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                {(user.name || user.email || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div className="max-w-32">
                <p className="truncate text-sm font-bold text-slate-800">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-slate-400">
                  {user.email}
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
            >
              সাইন আউট
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end sm:hidden">
        <button
          type="button"
          tabIndex={0}
          aria-label="মেনু খুলুন"
          className="btn btn-ghost btn-circle text-xl"
        >
          ☰
        </button>

        <ul
          tabIndex={0}
          className="menu dropdown-content z-100 mt-3 w-60 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl"
        >
          {!user ? (
            <>
              <li>
                <Link href="/signin">সাইন ইন</Link>
              </li>
              <li>
                <Link href="/signup">সাইন আপ</Link>
              </li>
            </>
          ) : (
            <>
              <li className="menu-title">
                <span className="truncate">
                  {user.name || user.email}
                </span>
              </li>

              <li>
                <Link href="/profile">👤 আমার প্রোফাইল</Link>
              </li>

              <li>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="text-red-600"
                >
                  সাইন আউট
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

