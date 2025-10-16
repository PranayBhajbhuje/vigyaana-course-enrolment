// backend/server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    const seed = {
      courses: [
        { id: "course01", title: "Intro to AI", instructor: "Dr. Smith", duration: "6 weeks" },
        { id: "course02", title: "React for Beginners", instructor: "Ms. Patel", duration: "4 weeks" },
        { id: "course03", title: "Node.js Fundamentals", instructor: "Mr. Khan", duration: "5 weeks" },
        { id: "course04", title: "Data Structures", instructor: "Dr. Rao", duration: "8 weeks" }
      ],
      enrollments: []
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/api/courses', (req, res) => {
  const data = readData();
  res.json(data.courses);
});

app.post('/api/enroll', (req, res) => {
  const { userId, courseId } = req.body;
  if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });
  const data = readData();
  const already = data.enrollments.find(e => e.userId === userId && e.courseId === courseId);
  if (already) return res.status(409).json({ error: 'Already enrolled' });
  const enrolledAt = new Date().toISOString();
  const newEnroll = { id: String(Date.now()), userId, courseId, enrolledAt };
  data.enrollments.push(newEnroll);
  writeData(data);
  res.json(newEnroll);
});

app.get('/api/my-courses', (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  const data = readData();
  const joined = data.enrollments
    .filter(e => e.userId === userId)
    .map(e => {
      const course = data.courses.find(c => c.id === e.courseId);
      return { enrollmentId: e.id, enrolledAt: e.enrolledAt, ...course };
    })
    .sort((a,b) => b.enrolledAt.localeCompare(a.enrolledAt));
  res.json(joined);
});

app.get('/api/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on port', PORT));