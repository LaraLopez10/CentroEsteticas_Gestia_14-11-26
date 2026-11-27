export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
}

export interface AuthTenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
}

export interface AuthMembership {
  tenant: AuthTenant;
  role: string;
  permissions: string[];
}

export interface LoginResponse {
  user: AuthUser;
  memberships: AuthMembership[];
  accessToken: string;
  expiresAt: string;
}

export interface AuthSession {
  user: AuthUser;
  memberships: AuthMembership[];
  activeMembership: AuthMembership | null;
  accessToken: string;
  expiresAt: string;
}

export interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
