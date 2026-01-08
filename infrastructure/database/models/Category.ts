import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
    icon: string;
    image?: string;
    order: number;
}

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    icon: { type: String, required: true },
    image: { type: String },
    order: { type: Number, default: 0 }
});

export const Category = mongoose.model<ICategory>('Category', CategorySchema);
