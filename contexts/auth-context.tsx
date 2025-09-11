"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { AuthState, UserRole } from "@/lib/auth"
import {
  getCurrentUser,
  setCurrentUser,
  signIn as authSignIn,
  signUp as authSignUp,
  signOut as authSignOut,
} from "@/lib/auth"

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>
  signUp: (userData: {
    email: string
    password: string
    name: string
    role: UserRole
    institution: string
  }) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const user = getCurrentUser()
    setState({
      user,
      isLoading: false,
      isAuthenticated: !!user,
    })
  }, [])

  const signIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const user = await authSignIn(email, password)
      setCurrentUser(user)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const signUp = async (userData: {
    email: string
    password: string
    name: string
    role: UserRole
    institution: string
  }) => {
    setState((prev) => ({ ...prev, isLoading: true }))
    try {
      const user = await authSignUp(userData)
      setCurrentUser(user)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const signOut = () => {
    authSignOut()
    setCurrentUser(null)
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
