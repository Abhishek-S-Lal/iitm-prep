import { useState } from "react";

interface Props {
  videoId: string;
  title: string;
  channel?: string;
  duration?: string;
}

export default function VideoPlayer({ videoId, title, channel, duration }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="my-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {!loaded && (
          <button
            onClick={() => setLoaded(true)}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-iitm-700 to-slate-900 text-white transition hover:opacity-90"
            style={{
              backgroundImage: `linear-gradient(rgba(8,15,30,0.5), rgba(8,15,30,0.6)), url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-iitm-500/90 shadow-lg ring-4 ring-white/20">
              <svg viewBox="0 0 24 24" fill="white" className="ml-1 h-8 w-8">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="px-4 text-center text-sm font-medium">{title}</div>
          </button>
        )}
        {loaded && (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full"
          />
        )}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <div className="truncate">
          <span className="font-medium text-slate-700 dark:text-slate-200">{title}</span>
          {channel && <span> · {channel}</span>}
        </div>
        {duration && <div className="shrink-0 font-mono">{duration}</div>}
      </div>
    </div>
  );
}
