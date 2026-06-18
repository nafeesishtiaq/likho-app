import PostCardSkeleton from "@/components/layout/PostCardSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-950 px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col gap-6">
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    </main>
  );
}
