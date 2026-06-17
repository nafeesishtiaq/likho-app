"use client";

import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const supabase = createClient();

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div>
      <h1>Sign in to Likho</h1>
      <button onClick={signInWithGoogle}>Continue with Google</button>
    </div>
  );
}
