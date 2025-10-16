import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'backend', 'data.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ error: 'userId required' });

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const joined = data.enrollments
      .filter(e => e.userId === userId)
      .map(e => {
        const course = data.courses.find(c => c.id === e.courseId);
        return { enrollmentId: e.id, enrolledAt: e.enrolledAt, ...course };
      })
      .sort((a,b) => b.enrolledAt.localeCompare(a.enrolledAt));

    res.status(200).json(joined);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
