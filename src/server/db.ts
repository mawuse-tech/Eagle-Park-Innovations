import 'server-only';
import mongoose from 'mongoose';

export class DatabaseUnavailableError extends Error {
  constructor() { super('Database connection unavailable'); this.name = 'DatabaseUnavailableError'; }
}

const globalDatabase = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};

export async function connectDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not defined');
  if (!globalDatabase.mongooseConnection) {
    globalDatabase.mongooseConnection = mongoose.connect(uri, {
      // Preserve the Express database override, including when the URI has another default.
      dbName: 'eagle_park_ecommerce',
      serverSelectionTimeoutMS: 10000,
      retryReads: false,
      retryWrites: false,
      bufferCommands: false,
    }).catch(() => {
      // Keep the rejected promise: later requests must not retry a failed connection.
      // Restart the server explicitly after correcting database connectivity.
      throw new DatabaseUnavailableError();
    });
  }
  return globalDatabase.mongooseConnection;
}
