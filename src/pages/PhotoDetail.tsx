import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { PicsumPhoto } from '../api/picsum'
import { getPhoto, fullUrl } from '../api/picsum'

export default function PhotoDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [photo, setPhoto] = useState<PicsumPhoto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    getPhoto(id)
      .then(setPhoto)
      .catch((e: any) => setError(e.message ?? 'Failed to fetch'))
      .finally(() => setLoading(false))
  }, [id])

  const placeholderTitle = useMemo(() => `Beautiful moment #${id}`, [id])
  const placeholderDescription = 'No description available for this photo. Enjoy the view!'

  if (loading) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="loader" />
      </div>
    )
  }
  if (error) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700"
        >
          Go Back
        </button>
      </div>
    )
  }
  if (!photo) return null

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="flex items-center gap-3 py-4 text-sm text-slate-400">
        <Link to="/photos" className="hover:underline">
          Photos
        </Link>
        <span>/</span>
        <span>#{photo.id}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <img
            src={fullUrl(photo, 1600)}
            alt={`Full photo by ${photo.author}`}
            className="w-full h-auto rounded-2xl shadow-card"
          />
        </div>
        <aside className="lg:col-span-2 space-y-6">
          <div className="card-dark rounded-2xl p-6">
            <h2 className="text-2xl font-semibold text-slate-100">{placeholderTitle}</h2>
            <p className="mt-2 text-slate-400">{placeholderDescription}</p>
            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-slate-500">Author</dt>
                <dd className="font-medium text-slate-200">{photo.author}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Dimensions</dt>
                <dd className="font-medium text-slate-200">
                  {photo.width}×{photo.height}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-slate-500">Source</dt>
                <dd>
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    View on picsum.photos
                  </a>
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <a
                href={fullUrl(photo, 2400)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white"
              >
                Open Full Size
              </a>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-8">
        <Link to="/photos" className="text-slate-400 hover:underline">
          ← Back to all photos
        </Link>
      </div>
    </div>
  )
}
