import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workoutRouter";
import mongoose from "mongoose";
import userRoutes from "./routes/userRouter";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT;
const MONG_URI = process.env.MONG_URI!;
const app = express();

app.use(express.json());
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(MONG_URI!)
  .then(() => {
    app.listen(process.env.PORT ?? 4000, () => {
      console.log(`listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error", err);
  });

export default app;
