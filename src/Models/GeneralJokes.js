import { Schema, model } from 'mongoose';

const GeneralJokesSchema = new Schema({
  id: { type: Number, required: true },
  joke: { type: String, required: true },
});

GeneralJokesSchema.index({ id: -1 });

const GeneralJokes = model('generals_jokes', GeneralJokesSchema);

export default GeneralJokes;
