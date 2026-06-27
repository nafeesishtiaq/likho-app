import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url)")
    .eq("id", id)
    .single();

  if (!post) notFound();

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-3xl font-semibold leading-snug tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-slate-600 font-medium">
              {post.profiles.username}
            </span>
            <span className="text-xs text-slate-700">·</span>
            <span className="text-xs uppercase tracking-widest text-slate-700">
              {date}
            </span>
          </div>
        </div>

        <p className="text-slate-400 text-base leading-relaxed">
          {post.content}
        </p>
        {post.image_urls && post.image_urls.length > 0 && (
          <div
            className={`grid gap-2 ${
              post.image_urls.length > 1 ? "grid-cols-2" : "grid-cols-1"
            }`}
          >
            {post.image_urls.slice(0, 2).map((url: string) => (
              <Image
                key={url}
                src={url}
                alt={post.title}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
