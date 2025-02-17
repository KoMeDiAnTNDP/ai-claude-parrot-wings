export interface User {
	id: number;
	name: string;
  email: string;
  balance: number;
}
  
export interface Transaction {
  id: number;
  date: string;
  username: string;
  amount: number;
  balance: number;
}

export interface LoginResponse {
  id_token: string;
}
  
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id_token: string;
}
  
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}