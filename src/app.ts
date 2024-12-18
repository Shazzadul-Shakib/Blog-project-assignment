import express from 'express';
import cors from 'cors';

export const app = express();

// --- Parsers --- //
app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
  res.send('Blog project server is running...');
});
