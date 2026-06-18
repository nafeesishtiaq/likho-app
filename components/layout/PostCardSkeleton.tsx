export default function PostCardSkeleton() {
  return (
    <article className="py-4 flex flex-col gap-4 border-b border-blue-950 animate-pulse">
      {/* Title */}
      <div className="h-8 bg-slate-800 rounded w-3/4" />

      {/* Username & date */}
      <div className="flex items-center gap-3">
        <div className="h-3 bg-slate-800 rounded w-20" />
        <div className="h-3 bg-slate-800 rounded w-3" />
        <div className="h-3 bg-slate-800 rounded w-16" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-2/3" />
      </div>

      {/* Image */}
      <div className="w-full aspect-video bg-slate-800 rounded-sm" />
    </article>
  );
}
