import express, { Request, Response } from 'express';

import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'Server is healthy' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});