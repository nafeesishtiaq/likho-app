"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OnBoardingPage() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const supabase = createClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    setError("");
    setIsLoading(true);
    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (existing) {
      setError("That username is already taken.");
      setIsLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("profiles").insert({
      id: user?.id,
      username: username,
    });
    setIsLoading(false);
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-white text-2xl font-semibold tracking-tight">
            Create a username
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) setError("");
              }}
              placeholder="username"
              className="w-full bg-slate-900 border border-slate-800 text-white text-sm placeholder:text-slate-700 px-4 py-3 outline-none focus:border-slate-600 transition-colors rounded-lg"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>

          <button
            onClick={handleSubmit}
            disabled={!username.trim() || isLoading}
            className="w-full bg-white rounded-lg text-slate-950 text-sm font-semibold py-3 px-4 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Creating user..." : "Continue"}
          </button>
        </div>
      </div>
    </main>
  );
}
