import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'backend', 'data.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!fs.existsSync(DATA_FILE)) return res.status(500).json({ error: 'Data file missing' });
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.status(200).json(data.courses);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
