import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

import routeIndex from './routes/index.js';
import { config } from './config.js';
import importItems from './importItems.js';

const app = express();
const server = http.createServer(app);

/* Middleware */
// Allow cross-origin requests (React frontend <-> Node backend)
app.use(cors());

// Parse incoming JSON and form data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', routeIndex);

const onListening = async () => {
  console.log("Server is Listening");

  try {
    // Connect using config from .env
    await mongoose.connect(config.db.uri, { autoIndex: false });
    console.log('✅ MongoDB connected');

    // Run one-time import if flag is true
    if (config.flags.runImport) {
      await importItems();
      console.log("📦 Item import complete");
    }

  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }
};

server.listen(config.server.port);
server.on('listening', onListening);
server.on('error', () => console.log("❌ Error in server connection"));

// Optional: Mongoose connection events
mongoose.connection.on('open', () => console.log('Mongoose connection set up successfully'));
mongoose.connection.on('error', (err) => console.log('Mongoose connection error:', err));
