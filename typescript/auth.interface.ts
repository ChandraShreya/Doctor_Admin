export interface IUser {
  _id: string;
  email: string;
  name: string;
  role?: "admin" | "doctor" | "patient";
  createdAt?: string;
  updatedAt?: string;
}

export interface IAuthResponse {
  success: boolean;
  message: string;
  user?: IUser;
  token?: string;
}

export interface IAuthState {
  loading: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
  error: string | null;
}

export interface IAuthSignInPayload {
  email: string;
  password: string;
}

export interface IAuthSignInResponse {
  status: boolean;
  message: string;
  token?: string;
  user?: IUser;
}
