import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    status: {
        code: {
            type: String,
            enum: ['DRAFT', 'PROCESSING', 'SUCCESS'],
            required: true
        }
    },
    person: {
        lastName: String,
        firstName: String,
        secondName: String,
        driverLicense: String,
        email: String
    },
    auto: {
        brand: String,
        model: {
            id: Number,
            name: String
        }
    },
    city: {
        code: String,
        name: String
    },
    createDate: Date
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
