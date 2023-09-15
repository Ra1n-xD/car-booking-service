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
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        secondName: {
            type: String
        },
        driverLicense: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    auto: {
        brand: {
            type: String,
            required: true
        },
        model: {
            id: {
                type: Number,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    },
    city: {
        code: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    createDate: {
        type: Date,
        required: true
    }
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
