import { api, endpoints } from "./api";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

<<<<<<< HEAD
export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export async function login(data: LoginInput): Promise<AuthResponse> {
  return api<AuthResponse>(endpoints.auth.login, {
=======
export async function login(data: LoginInput) {
  return api(endpoints.auth.login, {
>>>>>>> origin/dorito/ui-foundation
    method: "POST",
    body: JSON.stringify(data),
  });
}

<<<<<<< HEAD
export async function register(data: RegisterInput): Promise<unknown> {
  return api<unknown>(endpoints.auth.register, {
=======
export async function register(data: RegisterInput) {
  return api(endpoints.auth.register, {
>>>>>>> origin/dorito/ui-foundation
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser() {
  return api(endpoints.auth.me);
}
const TOKEN_KEY = "sumi_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}