import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'backend', 'data.json');

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, courseId } = req.body;
    if (!userId || !courseId) return res.status(400).json({ error: 'userId and courseId required' });

    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const already = data.enrollments.find(e => e.userId === userId && e.courseId === courseId);
    if (already) return res.status(409).json({ error: 'Already enrolled' });

    const newEnroll = { id: String(Date.now()), userId, courseId, enrolledAt: new Date().toISOString() };
    data.enrollments.push(newEnroll);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

    res.status(200).json(newEnroll);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
