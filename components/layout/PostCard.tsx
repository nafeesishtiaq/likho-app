"use client";
import Image from "next/image";

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

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="py-4 flex flex-col gap-4 border-b border-blue-950 max-w-2xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-3xl font-semibold leading-snug tracking-tight">
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
    </article>
  );
}
