import axiosClient from "../axiosClient";

interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export const login = async (
  payload: LoginPayload
): Promise<AuthResponse> => {
  const response = await axiosClient.post<AuthResponse>(
    "/auth/login",
    payload
  );
  return response.data;
};

export const signup = async (userData: Record<string, unknown>) => {
  const response = await axiosClient.post("/auth/signup", userData);
  return response.data;
};
