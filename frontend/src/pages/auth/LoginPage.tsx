import LoadingSmall from "@/components/custom/loading/LoadingSmall";
import { useAuthStore } from "@/stores/auth/auth.store";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, loading } = useAuthStore();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const success = await login(form);
    if (success) navigate("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-gray-900 mb-3"
        >
          Login Account
        </motion.h1>

        <form onSubmit={submit} className="space-y-5">
          {/* USERNAME */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Username"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              autoComplete=""
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-primary outline-none"
            />
          </motion.div>

          {/* PASSWORD */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="relative"
          >
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete=""
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-primary outline-none"
            />
          </motion.div>

          {/* SUBMIT BUTTON */}
          <motion.button
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`${
              loading
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer hover:scale-101"
            } w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center justify-center gap-2 shadow-lg`}
          >
            {loading ? (
              <LoadingSmall />
            ) : (
              <>
                Login
                <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </form>

        {/* LINK TO LOGIN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6 text-gray-500"
        >
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
