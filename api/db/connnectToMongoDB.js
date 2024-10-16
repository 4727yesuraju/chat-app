import mongoose from 'mongoose';

export const connnectToMongoDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CONN_URL);
        console.log("Connected successfully");
    } catch (error) {
        console.log("while connecting to DB : "+error.message);
    }
}