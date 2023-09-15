import mongoose from 'mongoose';

const { Schema } = mongoose;

const citySchema = new Schema({
    code: String,
    name: String
});

export default mongoose.models.City || mongoose.model('City', citySchema);
