import React from "react";
import { AuthFormProps } from "../../types/types";
import FormInputComp from "./FormInputComp";
import PasswordInput from "./PasswordInput";
import PasswordRequirements from "./passwordCheck/PasswordRequirements";

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  userName,
  setUserName,
  showPassword,
  togglePasswordVisibility,
  handleAuth,
}) => {

  const isPasswordValid =
    password.trim() !== "" &&
    password.length >= 6 &&
    /\d/.test(password) &&
    /[a-z]/.test(password);

  const isFormValid =
    mode === "register"
      ? email.trim() !== "" && userName.trim() !== "" && isPasswordValid
      : email.trim() !== "" && password.trim() !== "";

  return (
    <form
      onSubmit={(e) => handleAuth(e, mode !== "register")}
      className="space-y-4"
    >
      <FormInputComp
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <PasswordInput
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      
      {mode === "register" && (
        <>
          <PasswordRequirements password={password} />
          <FormInputComp
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </>
      )}

      {!isFormValid && (
        <p className="text-red-700 text-sm font-semibold" >
          🚨 Please fill in all fields and meet the requirements.
        </p>
      )}

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-3 rounded-md transition duration-300 ease-in-out ${
          isFormValid
            ? "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black font-semibold"
            : "bg-gray-500 text-white cursor-not-allowed"
        }`}
      >
        {mode === "register" ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
