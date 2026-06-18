"use client";
import Link from "next/link";
import { useAuth } from "../auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/signin");
  }

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-blue-950">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-white text-base font-semibold tracking-tight hover:text-slate-400 transition-colors"
        >
          Likho
        </Link>

        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                href="/new"
                className="text-slate-400 text-sm tracking-wide hover:text-white transition-colors"
              >
                + Write
              </Link>
              <button
                onClick={handleSignOut}
                className="text-[11px] uppercase tracking-widest text-slate-600 hover:text-red-400 transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="text-slate-400 text-sm tracking-wide hover:text-white transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
