import React, { useState } from 'react'
import Catalog from './pages/Catalog'
import Dashboard from './pages/Dashboard'

export default function App(){
  const [page, setPage] = useState('catalog')
  const [userId, setUserId] = useState(() => localStorage.getItem('userId') || 'student_001')

  const setAndSave = (id) => { setUserId(id); localStorage.setItem('userId', id) }

  return (
    <div className="container">
      <header className="header" role="banner">
        <div className="brand">EduHub Learner</div>
        <div className="flex">
          <div className="user">
            <label className="note" style={{marginRight:8}}>User ID</label>
            <input value={userId} onChange={e => setAndSave(e.target.value)} style={{padding:'6px 8px',borderRadius:8,border:'1px solid #e2e8f0'}} />
          </div>
          <div className="nav">
            <button className="link" onClick={() => setPage('catalog')}>Catalog</button>
            <button className="link" onClick={() => setPage('dashboard')}>Dashboard</button>
          </div>
        </div>
      </header>

      {page === 'catalog' ? <Catalog userId={userId} /> : <Dashboard userId={userId} />}
    </div>
  )
}