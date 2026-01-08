import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    code: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    dimensions: string;
    unit: string;
    inStock: boolean;
    isExclusive?: boolean;
    categoryId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: String },
    image: { type: String, required: true },
    dimensions: { type: String },
    unit: { type: String, default: '/ตร.ม.' },
    inStock: { type: Boolean, default: true },
    isExclusive: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
}, { timestamps: true });

ProductSchema.index({ name: 'text', code: 'text' });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
