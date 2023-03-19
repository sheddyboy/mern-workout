import { Request, Response } from "express";
import userModel from "../models/userModel";
import jwt from "jsonwebtoken";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET!, { expiresIn: "3d" });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.loginUser(email, password);

    // create a new token
    const token = createToken(user?._id);

    res.status(200).json({ email, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};
const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.signupUser(email, password);

    // create a new token
    const token = createToken(user?._id);

    res.status(200).json({ email, token });
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export { login, signup };