import mongoose from 'mongoose';

const { Schema } = mongoose;

const autoSchema = new Schema({});

export default mongoose.models.Auto || mongoose.model('Auto', autoSchema);
