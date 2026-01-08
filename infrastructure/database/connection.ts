import mongoose from 'mongoose';



let isConnected = false;

export async function connectDB(): Promise<void> {
    if (isConnected) return;

    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/xsurface';
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

export async function disconnectDB(): Promise<void> {
    if (!isConnected) return;
    await mongoose.disconnect();
    isConnected = false;
}
