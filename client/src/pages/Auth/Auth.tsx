import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContainer from "./AuthContainer";
import AuthForm from "./AuthForm";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode") || "login";
  const API_URL = "http://localhost:3000";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userStatus, setUserStatus] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (loggedIn && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loggedIn, countdown]);

  const handleAuth = async (
    event: React.FormEvent<HTMLFormElement>,
    isLogin: boolean
  ) => {
    event.preventDefault();
    const endpoint = `${API_URL}${
      isLogin ? "/users/login" : "/users/register"
    }`;

    try {
      const response = await axios.post(endpoint, {
        email,
        password,
        name: userName,
      });
      const { token, name, role, _id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("UserName", name);
      localStorage.setItem("UserRole", role);
      localStorage.setItem("userId", _id);

      setLoggedIn(true);
      setUserName(name);
      setUserStatus(role);
      setCountdown(4);
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 4000,
      });

      setTimeout(() => {
        if (role === "visitor") {
          navigate("/welcome");
        } else if (role === "admin") {
          navigate("/admin");
        }
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // have to deaclare that axios err for tsx
        toast.error(error.response?.data?.message || "An error occurred");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
      console.error(isLogin ? "Login error:" : "Registration error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthContainer>
      <AnimatePresence>
        {!loggedIn ? (
          <motion.div
            key="auth-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-black">
              {mode === "register" ? "Register" : "Login"}
            </h2>
            {mode === "register" && (
              <p className="font-mono mb-4 text-sm text-black">
                You may register with a dummy email
              </p>
            )}
            <AuthForm
              mode={mode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              userName={userName}
              setUserName={setUserName}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              handleAuth={handleAuth}
            />
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="text-center"
          >
            <motion.h2
              className="text-2xl font-bold mb-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              Welcome, {userName}!
            </motion.h2>
            <p>Login successful! Redirecting...</p>
            <motion.p
              className="mt-4 text-lg"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              You will be redirected in {countdown} seconds.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer />
    </AuthContainer>
  );
};

export default Auth;
