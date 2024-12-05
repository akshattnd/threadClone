import mongoose from "mongoose";
export const dbConnect = async () => {
    const url = process.env.MONGO_URl!;

    mongoose.connect(url)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });

}
