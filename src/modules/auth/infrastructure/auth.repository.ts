import type { AuthSession } from "../domain/session";

interface LoginInput {
  usernameOrEmail: string;
  password: string;
  remember: boolean;
}

const MOCK_USERS: Array<{
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: AuthSession["role"];
}> = [
  {
    id: "1",
    name: "Ana García",
    email: "ana@inducom.com",
    username: "agarcia",
    password: "123456",
    role: "recruiter",
  },
  {
    id: "2",
    name: "Carlos Ruiz",
    email: "carlos@inducom.com",
    username: "cruiz",
    password: "123456",
    role: "reviewer",
  },
  {
    id: "3",
    name: "Admin Inducom",
    email: "admin@inducom.com",
    username: "admin",
    password: "admin123",
    role: "admin",
  },
];

const AUTH_COOKIE_NAME = "rrhh_session";

function setSessionCookie(session: AuthSession, remember: boolean) {
  if (typeof document === "undefined") return;

  const encoded = encodeURIComponent(JSON.stringify(session));
  const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 8;

  document.cookie = `${AUTH_COOKIE_NAME}=${encoded}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

export const authRepository = {
  async login(input: LoginInput): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const identifier = input.usernameOrEmail.trim().toLowerCase();

    const user = MOCK_USERS.find(
      (item) =>
        item.email.toLowerCase() === identifier ||
        item.username.toLowerCase() === identifier,
    );

    if (!user || user.password !== input.password) {
      throw new Error("Credenciales inválidas");
    }

    const session: AuthSession = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: `mock-token-${user.id}`,
    };

    setSessionCookie(session, input.remember);

    return session;
  },

  async logout(): Promise<void> {
    clearSessionCookie();
  },
};