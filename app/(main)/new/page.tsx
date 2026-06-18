"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Image from "next/image";
export default function New() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();
  const { user } = useAuth();


  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);

    const imageUrls: string[] = [];

    for (const image of images) {
      const { data, error } = await supabase.storage
        .from("post-images")
        .upload(`${user!.id}/${Date.now()}-${image.name}`, image);

      if (error) {
        alert("Image upload failed");
        setLoading(false);
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
      setImages((prev) => [...prev, ...selected].slice(0, 2));
      e.target.value = "";
    }
  }

  function removeImage(index: number) {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <h1 className="text-white text-2xl font-semibold tracking-tight">
          New post
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full bg-transparent border-b border-slate-800 text-white text-xl font-medium placeholder:text-slate-700 py-2 outline-none focus:border-slate-600 transition-colors"
          />

          <textarea
            placeholder="Write your thoughts..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            rows={10}
            className="w-full bg-slate-900 border border-slate-800 text-white text-sm leading-relaxed placeholder:text-slate-700 p-4 outline-none focus:border-slate-600 transition-colors resize-none"
          />

          <div className="flex flex-col gap-3">
            <label className="text-sm text-slate-500">
              Images <span className="text-slate-700 text-xs">(maximum 2)</span>
            </label>

            {images.length > 0 && (
              <div className="flex gap-3">
                {images.map((image, index) => (
                  <div key={index} className="relative w-28 h-28">
                    <Image
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {images.length < 2 && (
              <label className="self-start text-xs text-slate-400 border border-slate-800 bg-slate-900 hover:border-slate-600 py-2 px-4 transition-colors cursor-pointer">
                Select Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="h-px bg-slate-800" />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-white rounded-2xl text-slate-950 text-sm font-semibold py-2.5 px-8 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
