
import mongoose from 'mongoose';
import Genre from './models/genre';

async function seedGenres() {
  try {
    // Connect to the database
    const mongoDB = 'mongodb://127.0.0.1:27017/my_library_db';
    await mongoose.connect(mongoDB);

    // Define genres
    const genres = ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Fantasy'];
    
    // Remove existing genres first (optional)
    await Genre.deleteMany({});

    // Add new genres
    for (const genreName of genres) {
      const genre = new Genre({ name: genreName });
      await genre.save();
    }

    console.log('Genres seeded successfully');
    
    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding genres:', error);
  }
}

seedGenres();