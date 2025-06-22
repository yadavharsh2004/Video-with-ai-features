import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGOCB_URI!

if(!MONGODB_URI) throw new Error("Please define mongo_uri in env variable");

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn : null, promise: null}
}

export async function connectToDatabase() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.conn){
        const options = {
            bufferCommands: true,
            maxPoolSize: 10
        }

        mongoose.connect(MONGODB_URI, options)
        .then(() => mongoose.connection )
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise = null;
        throw error
    }

    return cached.conn;
}