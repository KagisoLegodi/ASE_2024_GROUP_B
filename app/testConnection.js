require('dotenv').config(); // Load environment variables from .env
import { MongoClient } from 'mongodb';

async function testConnection() {
  const uri = process.env.MONGODB_URI; // Get connection string from .env
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Try connecting to the database
    await client.connect();
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    // Log any connection errors
    console.error('Failed to connect to MongoDB:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

testConnection();
