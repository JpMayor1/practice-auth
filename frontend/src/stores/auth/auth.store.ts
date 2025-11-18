import { registerApi } from "@/api/auth/auth.api";
import type { AuthStateType } from "@/types/auth/auth.type";
import { showError } from "@/utils/error/error.util";
import toast from "react-hot-toast";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist<AuthStateType>(
    (set) => ({
      authUser: null,

      loading: false,

      register: async (data) => {
        set({ loading: true });
        try {
          const response = await registerApi(data);
          toast.success(response.data.message);
          return true;
        } catch (error) {
          console.error("Error registering in account", error);
          showError(error);
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
