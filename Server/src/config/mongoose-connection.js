import mongoose from "mongoose";
import dotenv from "dotenv";
import debug from "debug";

const dbgr = debug("development:mongoose");
dotenv.config({ quiet: true });

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    dbgr("Mongoose connected from app.js");
  })
  .catch((error) => {
    console.log(error);
    dbgr("Mongoose connection error");
  });

export default mongoose.connection;
