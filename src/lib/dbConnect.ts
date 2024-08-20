import mongoose from "mongoose";

type connectionObject = {
    isConnected?: number
}

const connection: connectionObject = {}

export async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to DB");
        return;
    }

    try {
        const db = await mongoose.connect(`${process.env.MONGO_URI!}/${process.env.DB_NAME}`);
        connection.isConnected = db.connections[0].readyState;
        // console.log("db.connections is Connected value", db.connections[0].readyState);
        console.log("DB connect successfully");

    } catch (error) {
        console.log("DB connection failed", error)
        process.exit(1);
    }
};