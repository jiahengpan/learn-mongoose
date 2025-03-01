


import mongoose, { Schema, Document, Model, FilterQuery, ObjectId } from 'mongoose';

/**
 * @interface IGenre - Interface representing the shape of a document in the genre collection.
 * @property {string} name - The name of the genre.
 */
export interface IGenre extends Document {
  name: string;
}

/**
 * @interface IGenreModel - Interface representing the Genre model.
 * This interface extends the Mongoose Model interface and adds custom static methods.
 * @property {Function} getGenreCount - Static method to get the count of genres.
 * @property {Function} getGenreIdByName - Static method to get the ID of a genre by its name.
 * @property {Function} getAllGenres - Static method to get all genres with optional sorting.
 */
export interface IGenreModel extends Model<IGenre> {
  getGenreCount(filter?: FilterQuery<IGenre>): Promise<number>;
  getGenreIdByName(name: string): Promise<mongoose.Types.ObjectId | null>;
  getAllGenres(sortOpts?: { [key: string]: 1 | -1 }): Promise<string[]>;
}

/**
 * Genre Schema defining the structure of genre documents in MongoDB.
 */
var GenreSchema: Schema<IGenre> = new Schema(
  {
    name: {type: String, required: true, maxLength: 100, minLength: 4}
  }
);

/**
 * Retrieves the count of genres in the databas based on the provided filter.
 * If no filter is provided, it returns the total count of genres.
 * @param filter the filter object to apply. The filter object must contain the following properties:
 *  - name: the name of the genre
 * @returns a promise that resolves to the count of genres matching the filter.
 */
GenreSchema.statics.getGenreCount = async function (filter? : FilterQuery<IGenre>): Promise<number> {
  return this.countDocuments(filter|| {});
}

/**
 * retrieves the ID of the first genre that matches the provided name.
 * @param name the name of the genre
 * @returns a promise that resolves to the ID of the genre, or null if no genre with the given name exists.
 */
GenreSchema.statics.getGenreIdByName = async function (name: string): Promise<mongoose.Types.ObjectId | null> {
  const genre = await this.findOne({ name });
  if (!genre) {
    return null;
  }
  return genre._id;
}

/**
 * Retrieves all genres with an optional sort option.
 * @param sortOpts an optional sort option to sort the genres.
 * @returns a promise that resolves to an array of genre names
 */
GenreSchema.statics.getAllGenres = async function (sortOpts?: { [key: string]: 1 | -1 }): Promise<string[]> {
  let genreList: IGenre[] = [];
  if(sortOpts) {
    genreList = await Genre.find().sort(sortOpts);
  } else {
    genreList = await Genre.find();
  }
  return genreList.map(genre => genre.name);
}

/**
 * Compile the schema into a model and export it.
 * The model is instantiated with the IGenre interface and 
 * the IGenreModel interface. This is to ensure that the model 
 * has both the instance methods and static methods defined 
 * in the respective interfaces.
 */
const Genre = mongoose.model<IGenre, IGenreModel>('Genre', GenreSchema);
export default Genre;