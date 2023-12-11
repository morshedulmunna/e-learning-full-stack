import mongoose from "mongoose";

const dbURL: string = process.env.MONGO_DB_URI || "";

const connectDB = async () => {
    try {
        // connect to database
        await mongoose.connect(dbURL).then((data: any) => {
            console.log(
                `Database connected successfully with ${data.connection.host}`
            );
        });
    } catch (error: any) {
        console.error(error.message);
        setTimeout(connectDB, 5000); // 5 seconds timeout for connect db again
    }
};

export default connectDB;
