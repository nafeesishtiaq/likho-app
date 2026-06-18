import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(username, avatar_url)")
    .order("created_at", { ascending: false });

  return (
    <main>
      <h1>Home</h1>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>by {post.profiles.username}</p>
          {post.image_urls?.map((url: string) => (
            <img key={url} src={url} alt={post.title} />
          ))}
        </div>
      ))}
    </main>
  );
}
