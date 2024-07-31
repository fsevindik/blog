import React from "react";

import { AuthFormProps } from "../../icons/types";
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
}) => (
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
    <button
      type="submit"
      className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
    >
      {mode === "register" ? "Register" : "Login"}
    </button>
  </form>
);

export default AuthForm;
