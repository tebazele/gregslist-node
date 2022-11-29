import { Schema } from "mongoose";

export const HouseSchema = new Schema({
    bathrooms: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    description: { type: String },
    imgUrl: { type: String, required: true },
    levels: { type: Number, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true }
},
    {
        timestamps: true, toJSON: { virtuals: true }
    }
) 