import mongoose from 'mongoose';

const { Schema } = mongoose;

const autoSchema = new Schema({
    brand: String,
    models: [
        {
            id: Number,
            name: String
        }
    ]
});

export default mongoose.models.Auto || mongoose.model('Auto', autoSchema);
