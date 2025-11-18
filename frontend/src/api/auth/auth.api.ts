import axiosInstance from "@/axios/axiosInstance";
import type { AccountType } from "@/types/account/account.type";

export const registerApi = async (data: Partial<AccountType>) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response;
};

export const loginApi = async (data: Partial<AccountType>) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response;
};
