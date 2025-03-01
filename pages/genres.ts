import { Response } from 'express';
import Genre from '../models/genre';
import express from 'express';

const router = express.Router();

/**
 * @route GET /genres
 * @group Genre
 * @returns an array of all genre names sorted alphabetically
 * @returns an error message if no genres were found 
 * or if there was an error processing the request
 */
router.get('/', async (_, res: Response) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    
    if (genres.length > 0) {
      const genreNames = genres.map(genre => genre.name);
      res.send(genreNames);
    } else {
      res.send('No genres found');
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.send('No genres found');
  }
});

/**
 * @route GET /genres/count
 * @group Genre
 * @returns the total count of genres in the database
 * @returns an error message if there was an error processing the request
 */
router.get('/count', async (_, res: Response) => {
  try {
    const count = await Genre.getGenreCount();
    res.send({ count });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Error retrieving genre count');
  }
});

export default router;