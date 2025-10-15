import { Link } from 'react-router-dom'
import type { PicsumPhoto } from '../api/picsum'
import { thumbUrl } from '../api/picsum'

export default function PhotoCard({ p }: { p: PicsumPhoto }) {
  return (
    <Link
      to={`/photos/${p.id}`}
      className="group relative block overflow-hidden rounded-2xl bg-slate-800 shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={thumbUrl(p, 600, 450)}
          alt={`Photo by ${p.author}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>

      <div className="absolute bottom-0 left-0 w-full px-4 py-3 text-slate-100">
        <p className="text-xs text-slate-400">Author</p>
        <p className="text-base font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
          {p.author}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-700/60 group-hover:ring-blue-500/50 transition-all duration-300 pointer-events-none"></div>
    </Link>
  )
}
