import { register } from "@/controllers/auth/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", register);

export default router;
