import express from "express";
import http from "http";
import cors from "cors";
import routeIndex from "./routes/index.js";
import { config } from "./config.js";
import importItems from "./importItems.js";
//import "./db.js"; // <-- this single import sets up and connects mongoose
import mongoose from "./db.js"; // ensure it's the shared instance


const app = express();
const server = http.createServer(app);

/* Middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/", routeIndex);


app.get("/api/debug-db", async (req, res) => {
  try {
    const dbName = mongoose.connection.name;
    const collections = await mongoose.connection.db.listCollections().toArray();
    res.json({
      connectedTo: dbName,
      collections: collections.map(c => c.name)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* Start Server */
const onListening = async () => {
  console.log("Server is Listening");

  try {
    // DB is already connected by db.js
    if (config.flags.runImport) {
      await importItems();
      console.log("📦 Item import complete");
    }
  } catch (err) {
    console.error("❌ Error during startup:", err);
  }
};

server.listen(config.server.port);
server.on("listening", onListening);
server.on("error", () => console.log("❌ Error in server connection"));
