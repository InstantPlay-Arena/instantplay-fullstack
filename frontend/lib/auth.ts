// Service d'authentification avec gestion JWT et localStorage

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name?: string
  }
}

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  email: string
  password: string
  name?: string
  confirmPassword: string
}

/**
 * Stocke le JWT dans localStorage
 */
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token)
  }
}

/**
 * Récupère le JWT depuis localStorage
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token")
  }
  return null
}

/**
 * Supprime le JWT (logout)
 */
export const clearToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token")
  }
}

/**
 * Login : envoie email/password et stocke le token
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Login failed")
  }

  const data: AuthResponse = await response.json()
  setToken(data.token)
  return data
}

/**
 * Signup : crée un nouvel utilisateur et stocke le token
 */
export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { confirmPassword, ...signupData } = payload

  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Signup failed")
  }

  const data: AuthResponse = await response.json()
  setToken(data.token)
  return data
}

/**
 * Logout : supprime le token
 */
export const logout = (): void => {
  clearToken()
}

/**
 * Fonction utilitaire pour décoder le JWT (optionnel)
 * Note: Ne jamais faire confiance au decoded token côté client pour la sécurité
 */
export const decodeToken = (token: string): any => {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Failed to decode token:", error)
    return null
  }
}

/**
 * Créer une fonction pour les appels API authentifiés (optionnel)
 */
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken()
  const headers = new Headers(options.headers || {})

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  return fetch(url, {
    ...options,
    headers,
  })
}
