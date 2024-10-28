import React from "react";
import { FormInputProps } from "../../types/types";

const FormInputComp: React.FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-3 py-2 border rounded-md text-black"
  />
);

export default FormInputComp;
