import { findAccountS, registerAccountS } from "@/services/auth/auth.service";
import { hashPassword } from "@/utils/bcrypt/bcrypt";
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

  // 5. Generate token
  generateToken(account._id.toString(), res);

  // 6. Return response
  res.status(200).json({
    message: "Account registered successfully.",
  });
};
