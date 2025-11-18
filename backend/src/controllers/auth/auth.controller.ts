import { findAccountS, registerAccountS } from "@/services/auth/auth.service";
import { comparePassword, hashPassword } from "@/utils/bcrypt/bcrypt";
import { AppError } from "@/utils/error/appError";
import generateToken from "@/utils/jwt/generateToken";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, username, password } = req.body;

  if (await findAccountS({ username })) {
    throw new AppError("Username already exists.", 409);
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create account
  const account = await registerAccountS({
    name,
    username,
    password: hashedPassword,
  });

  if (!account) {
    throw new AppError("Error creating account.", 400);
  }

  // Generate token
  generateToken(account._id.toString(), res);

  // Return response
  res.status(200).json({
    message: "Account registered successfully.",
  });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username) {
    throw new AppError("Username is required.", 400);
  }
  if (!password) {
    throw new AppError("Password is required.", 400);
  }

  const account = await findAccountS({ username });
  if (!account) {
    throw new AppError("Account not found.", 404);
  }

  const isPasswordCorrect = await comparePassword(
    password,
    account.password || ""
  );
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect credentials.", 401);
  }

  generateToken(account._id.toString(), res);

  res.status(200).json({ message: "Login successfuly." });
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};
