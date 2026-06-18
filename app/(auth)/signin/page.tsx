"use client";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  async function signInWithGoogle() {
    setIsLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-white text-2xl font-semibold tracking-tight">
            Sign in to Likho
          </h1>
          <p className="text-slate-500 text-sm">
            Safe Place to Dump Your Thoughts
          </p>
        </div>

        <button
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="flex items-center justify-center gap-3 w-full bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-white text-sm font-medium py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>Signing in...</>
          ) : (
            <>
              <Image src="/google.png" alt="Google" width={18} height={18} />
              Continue with Google
            </>
          )}
        </button>
      </div>
    </main>
  );
}
