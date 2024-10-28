import React from "react";
import EyeIcon from "../../icons/EyeIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
import { PasswordInputProps } from "../../types/types";

const PasswordInput: React.FC<PasswordInputProps> = ({
  password,
  setPassword,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none text-black focus:border-blue-500"
        placeholder="Password"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-black"
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" size={0} />
        ) : (
          <EyeSlashIcon className="h-5 w-5" size={0} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
