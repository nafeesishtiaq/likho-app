"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function OnBoardingPage() {
  const [username, setUsername] = useState("");
  const supabase = createClient();
  const router = useRouter();
  async function handleSubmit() {
    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", username)
      .single();

    if (existing) {
      alert("username already taken");
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();

    await supabase.from("profiles").insert({
      id: user?.id,
      username: username,
    });

    router.push("/");
  }
  return (
    <div>
      <h1>Create a username</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}
