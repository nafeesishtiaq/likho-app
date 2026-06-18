"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

export default function New() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [images, setImages] = useState<File[]>([]);
  const router = useRouter();
  const supabase = createClient();
  const { user } = useAuth();

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    const imageUrls: string[] = [];

    for (const image of images) {
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(`${user!.id}/${Date.now()}-${image.name}`, image);

      if (error) {
        alert("Image upload failed");
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("post-images").getPublicUrl(data.path);
      imageUrls.push(publicUrl);
    }
    
    await supabase.from("posts").insert({
      author_id: user!.id,
      title: form.title,
      content: form.content,
      image_urls: imageUrls,
    });
    router.push("/");
  }
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const selected = Array.from(e.target.files).slice(0, 2);
      setImages(selected);
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Write a title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Write your thoughts..."
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
