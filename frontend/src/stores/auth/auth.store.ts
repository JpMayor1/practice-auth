import { loginApi, logoutApi, registerApi } from "@/api/auth/auth.api";
import type { AuthStateType } from "@/types/auth/auth.type";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create<AuthStateType>((set) => ({
  authUser: null,

  loading: false,

  register: async (data) => {
    set({ loading: true });
    try {
      const response = await registerApi(data);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Error registering account", error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  login: async (data) => {
    set({ loading: true });
    try {
      const response = await loginApi(data);
      toast.success(response.data.message);
      return true;
    } catch (error) {
      console.error("Error logging in account", error);
      showError(error);
      return false;
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });
    try {
      await logoutApi();
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Error logging out", error);
      showError(error);
    } finally {
      set({ loading: false });
    }
  },
}));
