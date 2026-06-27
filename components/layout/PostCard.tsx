"use client";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "../auth/AuthProvider";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  image_urls?: string[];
  created_at: string;
  profiles: {
    username: string;
    avatar_url?: string;
  };
}

export default function PostCard({
  post,
  isReacted,
  reactionCount,
}: {
  post: Post;
  isReacted: boolean;
  reactionCount: number;
}) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const [liked, setLiked] = useState(isReacted);
  const [count, setCount] = useState(reactionCount);
  const supabase = createClient();
  const { user } = useAuth();

  async function handleReaction() {
    if (!user) return;
    if (liked) {
      setLiked(false);
      setCount((prev) => prev - 1);
      await supabase
        .from("reactions")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);
    } else {
      setLiked(true);
      setCount((prev) => prev + 1);
      await supabase
        .from("reactions")
        .insert({ post_id: post.id, user_id: user.id });
    }
  }
return (
  <article className="py-4 flex flex-col gap-4 border-b border-blue-950 max-w-2xl">
    <Link href={`/post/${post.id}`} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-3xl font-semibold leading-snug tracking-tight hover:underline decoration-1 underline-offset-2 transition-colors">
          {post.title}
        </h2>

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

      <p className="text-slate-400 text-base">{post.content}</p>

      {post.image_urls && post.image_urls.length > 0 && (
        <div
          className={`grid gap-2 mt-1 ${
            post.image_urls.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          {post.image_urls.slice(0, 2).map((url) => (
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
    </Link>

    <div className="flex items-center gap-5 pt-1">
      <button
        onClick={handleReaction}
        className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
          liked ? "text-red-400" : "text-slate-600 hover:text-slate-400"
        }`}
      >
        <Heart size={22} fill={liked ? "currentColor" : "none"} />
        <span className="text-xs">{count}</span>
      </button>
      <button className="flex items-center gap-1.5 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">
        <MessageCircle size={22} />
        <span className="text-sm">0</span>
      </button>
    </div>
  </article>
);
}
