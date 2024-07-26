import { ReactNode } from "react";

type Visibility = "visible" | "hidden" | "collapse";

export type IconProps = {
  color?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  cursor?: string;
  fontSize?: string;
  visibility?: Visibility;
  width?: string;
  height?: string;
  size: number;
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
  role: any;
  id: string;
  name: string;
}

type ObjectId = string;

export interface Rating {
  userId: ObjectId;
  rating: number;
}

export interface ratingPtops {
  rating: number;
}

export interface commentProps {
  comment: string;
}

interface Actor {
  name: string;
  imageUrl: string;
}

export interface Film {
  ratings: Rating[];
  _id: string;
  filmId: string;
  title: string;
  director: string;
  releaseYear: number;
  posterImageUrlA: string;
  bannerImageUrlB: string;
  actors: Actor[];
  filmOverview: string;
  publishYear: ReactNode;
}

export interface Reply {
  _id: string;
  userId: User;
  content: string;
  createdAt: string;
}

export interface Reaction {
  like: number;
  heart: number;
  smile: number;
  usersLiked: string[];
  usersLoved: string[];
  userSmiled: string[];
}

export interface Comment {
  _id: string;
  filmId: string;
  userId: User;
  content: string;
  createdAt: string;
  replies: Reply[];
  reaction: Reaction;
}

export interface CommentSectionProps {
  filmId: string | null;
  currentUserId: string | null;
}
