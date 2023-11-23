
import mongoose from "mongoose";

export const db = async () => {
  await mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => console.log("DB Connected"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};


