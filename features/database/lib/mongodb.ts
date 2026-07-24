import mongoose from "mongoose";

type MongooseCache = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
	mongoose?: MongooseCache;
};

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI does not exist in environment variables");
}

const cached = (globalWithMongoose.mongoose ??= { conn: null, promise: null });

export async function connectToDatabase() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI, {
				dbName: "FinanceManager",
				bufferCommands: false,
			})
			.then((mongoose) => {
				return mongoose;
			})
			.catch((err) => {
				console.error("❌ Error connecting to MongoDB: ", err);
				throw err;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}
