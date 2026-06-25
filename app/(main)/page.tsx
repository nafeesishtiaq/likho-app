import { createClient } from "@/lib/supabase/server";
import PostCard from "@/components/layout/PostCard";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/signin");

  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url), reactions(user_id)")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-6">
      <div className="max-w-3xl mx-auto flex flex-col">
        {posts && posts.length > 0 ? (
          <div className="flex flex-col gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                isReacted={post.reactions.some(
                  (r: { user_id: string }) => r.user_id === user.id
                )}
                reactionCount={post.reactions.length}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20">
            <p className="text-slate-600 text-sm">No posts yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
