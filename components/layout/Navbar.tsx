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
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/new">Write</Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign out</button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/signin">Sign in</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
