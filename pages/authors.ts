import { Response } from 'express';
import Author from '../models/author';
import express from 'express';

const router = express.Router();

router.get('/', async (_, res: Response) => {
  try {
    const data: string[] = await Author.getAllAuthors({ family_name: 1 });
    if (data.length > 0) {
      res.send(data);
    } else {
      res.send('No authors found');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.send('No authors found');
  }
});

export default router;
