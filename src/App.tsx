import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PhotosList from './pages/PhotosList'
import PhotoDetail from './pages/PhotoDetail'


export default function App() {
  return (
    <div className="min-h-screen">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<PhotosList />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
        <Route path="*" element={<Navigate to="/photos" replace />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
