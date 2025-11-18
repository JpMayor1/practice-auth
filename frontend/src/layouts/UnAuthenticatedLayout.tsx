import { useAccountStore } from "@/stores/account/account.store";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UnAuthenticatedLayout = () => {
  const { verify } = useAccountStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyFunc = async () => {
      const success = await verify();
      if (success) navigate("/home");
    };
    verifyFunc();
  }, [verify, navigate]);

  return (
    <div className="h-dvh w-dvw overflow-hidden bg-linear-to-br from-primary via-black to-primary text-white">
      <Outlet />
    </div>
  );
};

export default UnAuthenticatedLayout;
