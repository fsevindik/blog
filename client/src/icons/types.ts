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
  bonusVideos: any;
  honorableMentions: never[];
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  posterImageUrlA: string;
  bannerImageUrlB: string;
  actors: {
    name: string;
    imageUrl: string;
  }[];
  ratings: {
    userId: string;
    rating: number;
  }[];
  filmOverview: string;
  trailerUrl: string;
  averageRating: number;
}

export interface Reaction {
  like: number;
  heart: number;
  smile: number;
  usersLiked: string[];
  usersLoved: string[];
  userSmiled: string[];
}

export interface CommentSectionProps {
  filmId: string | null;
  _id: string | null;
  currentUserId: string | null;
}

export interface User {
  id: string | null;
  role: string;
  _id: string;
  name: string;
}

export interface Comment {
  _id: string;
  content: string;
  userId: User;
  likes: string[];
  replies: Reply[];
}

export interface Reply {
  _id: string;
  content: string;
  userId: User;
}

export interface RateModalProps {
  film: Film;
  onRate: (rate: number) => Promise<void>;
}
