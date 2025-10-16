import React, { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Catalog({ userId }){
  const [courses, setCourses] = useState([])
  const [enrolledIds, setEnrolledIds] = useState(new Set())
  const [toast, setToast] = useState('')

  useEffect(()=>{
    fetch(`${API_BASE}/api/courses`).then(r=>r.json()).then(setCourses)
    fetch(`${API_BASE}/api/my-courses?userId=${encodeURIComponent(userId)}`).then(r=>r.json()).then(data=>{
      const ids = new Set(data.map(d=>d.id))
      setEnrolledIds(ids)
    }).catch(()=>{})
  }, [userId])

  async function handleEnroll(courseId){
    if (enrolledIds.has(courseId)) return
    try{
      const r = await fetch(`${API_BASE}/api/enroll`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userId, courseId })
      });
      if (!r.ok){
        const err = await r.json();
        setToast(err.error || 'Enroll failed');
        setTimeout(()=>setToast(''),2500);
        return;
      }
      setToast('Enrolled successfully');
      setEnrolledIds(new Set([...enrolledIds, courseId]))
      setTimeout(()=>setToast(''),2500);
    }catch(e){
      setToast('Network error')
      setTimeout(()=>setToast(''),2500);
    }
  }

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>Available Courses</h2>
        <div className="note">Total: {courses.length}</div>
      </div>

      <div className="card-grid">
        {courses.map(c => (
          <div key={c.id} className="card" role="article">
            <h3>{c.title}</h3>
            <div className="small">Instructor: {c.instructor}</div>
            <div className="small" style={{marginTop:8}}>Duration: {c.duration}</div>
            <div style={{marginTop:12}}>
              <button
                className={"btn " + (enrolledIds.has(c.id) ? 'disabled' : '')}
                onClick={() => handleEnroll(c.id)}
                disabled={enrolledIds.has(c.id)}
              >
                {enrolledIds.has(c.id) ? 'Enrolled' : 'Enroll'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}