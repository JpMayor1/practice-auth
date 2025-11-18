import LoadingSmall from "@/components/custom/loading/LoadingSmall";
import { useAccountStore } from "@/stores/account/account.store";
import { useAuthStore } from "@/stores/auth/auth.store";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { account } = useAccountStore();
  const { logout, loading } = useAuthStore();

  const navigate = useNavigate();

  if (!account) return;

  async function logoutFunc() {
    await logout();
    navigate("/auth/login");
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-2">
      <p>Hi {account.name}!</p>
      <button
        onClick={logoutFunc}
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed opacity-80"
            : "cursor-pointer transition-all"
        } min-w-36 py-3 px-6 rounded-md text-gray-300 bg-red-500 flex items-center gap-2 text-lg`}
      >
        <LogOut />
        {loading ? <LoadingSmall /> : "Logout"}
      </button>
    </div>
  );
};

export default HomePage;
