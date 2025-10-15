export type PicsumPhoto = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

const BASE = 'https://picsum.photos'

export async function listPhotos(page = 1, limit = 30): Promise<PicsumPhoto[]> {
  const res = await fetch(`${BASE}/v2/list?page=${page}&limit=${limit}`)
  if (!res.ok) throw new Error(`Failed to fetch photos: ${res.status}`)
  return res.json()
}

export async function getPhoto(id: string): Promise<PicsumPhoto> {
  const res = await fetch(`${BASE}/id/${id}/info`)
  if (!res.ok) throw new Error(`Photo ${id} not found`)
  return res.json()
}

export function thumbUrl(p: PicsumPhoto, w = 400, h = 300) {
  return `${BASE}/id/${p.id}/${w}/${h}`
}

export function fullUrl(p: PicsumPhoto, w = 1600) {
  return `${BASE}/id/${p.id}/${w}`
}
