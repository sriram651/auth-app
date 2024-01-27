import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected successfully");
        });
        connection.on("error", () => {
            console.log("Mongo DB connection error");
            process.exit();
        });
    } catch (error) {
        console.log("something went wrong!", error);
    }
}