import { Schema } from "mongoose";

export const CarSchema = new Schema({
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, default: 'awesome car' },
    imgUrl: { type: String, required: true, maxLength: 255, minLength: 5 },
    color: { type: String },
    price: { type: Number, required: true }
},
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)

// virtuals are like getters 