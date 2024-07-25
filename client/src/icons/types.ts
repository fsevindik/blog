type Visibility = "visible" | "hidden" | "collapse";

export type IconProps = {
  color?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  cursor?: string;
  fontSize?: string;
  visibility?: Visibility;
  width?: string;
  height?: string;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<SVGSVGElement>;
  onMouseLeave?: React.MouseEventHandler<SVGSVGElement>;
};

export interface AuthFormProps {
  mode: string;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  userName: string;
  setUserName: (userName: string) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  handleAuth: (e: React.FormEvent<HTMLFormElement>, isLogin: boolean) => void;
}

export interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
}

export interface PasswordRequirementProps {
  password: string;
}

export interface RequirementCardProps {
  text: string;
  hasPassed: boolean;
}

export interface AuthContainerProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  name: string;
}

type ObjectId = string;

export interface Rating {
  userId: ObjectId;
  rating: number;
}
