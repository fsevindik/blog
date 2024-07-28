import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";
import AuthContainer from "./AuthContainer";
import AuthForm from "./AuthForm";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode") || "login";
  const { login, register, user } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (user && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (user && countdown === 0) {
      handleRedirect();
    }
    return () => clearInterval(timer);
  }, [user, countdown]);

  const handleRedirect = () => {
    if (user?.role === "visitor") {
      navigate("/welcome");
    } else if (user?.role === "admin") {
      navigate("/admin");
    }
  };

  const handleAuth = async (
    event: React.FormEvent<HTMLFormElement>,
    isLogin: boolean
  ) => {
    event.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, userName);
      }
      toast.success("Login successful! Redirecting...", {
        position: "top-center",
        autoClose: 4000,
      });
      setCountdown(5);
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthContainer>
      {!user ? (
        <div>
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
        </div>
      ) : (
        <div className="text-center bg-gray-300 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Welcome, {user.name}!
          </h2>
          <p className="text-black mb-4">Login successful! Redirecting...</p>
          <p className="mt-4 text-lg text-black font-bold">
            You will be redirected in {countdown} seconds.
          </p>
        </div>
      )}
      <ToastContainer />
    </AuthContainer>
  );
};

export default Auth;
