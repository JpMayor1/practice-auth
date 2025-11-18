import { useAuthStore } from "@/stores/auth/auth.store";
import { motion } from "framer-motion";
import { ArrowRight, Lock, User, UserCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSmall from "../components/custom/loading/LoadingSmall";

const RegisterPage = () => {
  const { register, loading } = useAuthStore();
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const success = await register(form);
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
          className="text-3xl font-bold text-center text-gray-900"
        >
          Create Account
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 mt-2 mb-8"
        >
          Sign up to get started
        </motion.p>

        <form onSubmit={submit} className="space-y-5">
          {/* NAME */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <UserCircle
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-100 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-primary outline-none"
            />
          </motion.div>

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
                Register
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
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
