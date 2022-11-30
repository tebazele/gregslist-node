import { Schema } from "mongoose";

export const JobSchema = new Schema({
    company: { type: String, required: true },
    description: { type: String, required: true },
    hours: { type: Number, required: true },
    jobTitle: { type: String, required: true },
    rate: { type: Number, required: true },
    imgUrl: { type: String, required: true }
},
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)