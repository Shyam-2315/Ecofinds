import React, { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  username: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, username: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

// Set your actual FastAPI backend URL below:
const API_BASE_URL = "http://localhost:8000" // Change to your deployed backend if needed

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("ecofinds_token")
    const storedUser = localStorage.getItem("ecofinds_user")
    if (storedToken) setToken(storedToken)
    if (storedUser) setUser(JSON.parse(storedUser))
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!response.ok) throw new Error("Login failed")
    const data = await response.json()
    const { access_token } = data

    // Optionally: fetch user profile after login, or use returned info if backend provides it
    let userData: User | null = null
    try {
      // If your login returns user info, add it here: userData = data.user
      // Otherwise, fetch user profile endpoint if needed
      userData = { id: "", email, username: "" }
      // If backend supports profile endpoint, fetch it here to get details
    } catch (err) {
      userData = { id: "", email, username: "" }
    }

    setToken(access_token)
    setUser(userData)
    localStorage.setItem("ecofinds_token", access_token)
    localStorage.setItem("ecofinds_user", JSON.stringify(userData))
  }

  const register = async (email: string, username: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
    if (!response.ok) throw new Error("Registration failed")
    // Registration succeeded, auto-login
    await login(email, password)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("ecofinds_token")
    localStorage.removeItem("ecofinds_user")
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
