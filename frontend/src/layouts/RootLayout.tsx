import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="h-dvh w-dvw overflow-hidden bg-linear-to-br from-primary via-black to-primary text-white">
      <Outlet />
    </div>
  );
};

export default RootLayout;
