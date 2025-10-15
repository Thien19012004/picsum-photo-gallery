import { useEffect, useRef, useState } from 'react'
import PhotoCard from '../components/PhotoCard'
import type { PicsumPhoto } from '../api/picsum'
import { listPhotos } from '../api/picsum'

export default function PhotosList() {
  const [photos, setPhotos] = useState<PicsumPhoto[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const fetchPage = async (pg: number) => {
    if (loading || !hasMore) return
    setLoading(true)
    setError(null)
    try {
      const data = await listPhotos(pg, 30)
      setPhotos(prev => [...prev, ...data])
      setHasMore(data.length > 0)
      setPage(pg + 1)
    } catch (e: any) {
      setError(e.message ?? 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPage(1)
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fetchPage(page)
        }
      })
    }, { rootMargin: '800px 0px' })

    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, hasMore, loading])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <header className="sticky top-0 z-10 -mx-4 sm:-mx-6 lg:-mx-8 backdrop-blur bg-slate-900/80 border-b border-slate-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-100">Explore Photos</h1>
          <p className="text-slate-400 text-sm">Scroll to load more. Click a photo to view details.</p>
        </div>
      </header>

      {error && (
        <div className="mt-6 rounded-lg bg-red-900 border border-red-500 p-4 text-red-300">{error}</div>
      )}

      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {photos.map(p => (
          <li key={p.id}>
            <div className="card-dark rounded-2xl overflow-hidden">
              <PhotoCard p={p} />
            </div>
          </li>
        ))}
      </ul>

      <div ref={sentinelRef} className="h-10" />

      <div className="flex items-center justify-center py-8">
        {loading && <div className="loader" aria-label="Loading more" />}
        {!loading && !hasMore && (
          <p className="text-slate-400 text-sm">You’ve reached the end — no more photos.</p>
        )}
      </div>
    </div>
  )
}
