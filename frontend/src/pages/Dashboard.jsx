import React, { useEffect, useState } from 'react'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export default function Dashboard({ userId }){
  const [myCourses, setMyCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetch(`${API_BASE}/api/my-courses?userId=${encodeURIComponent(userId)}`)
      .then(r=>r.json()).then(data=>{ setMyCourses(data); setLoading(false) }).catch(()=>setLoading(false))
  }, [userId])

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h2>My Courses</h2>
        <div className="note">Enrolled: {myCourses.length}</div>
      </div>

      {loading ? <div className="note">Loading...</div> : (
        <div className="dashboard-list">
          {myCourses.length === 0 && <div className="note">No enrolled courses yet.</div>}
          {myCourses.map(c => (
            <div key={c.enrollmentId} className="card">
              <div className="row">
                <div>
                  <h3 style={{marginBottom:6}}>{c.title}</h3>
                  <div className="small">Instructor: {c.instructor}</div>
                  <div className="small">Duration: {c.duration}</div>
                  <div className="small">Enrolled at: {new Date(c.enrolledAt).toLocaleString()}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <button className="btn">Continue Learning</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}