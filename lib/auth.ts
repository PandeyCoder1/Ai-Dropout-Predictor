"use client"

export type UserRole = "admin" | "teacher" | "counselor"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  institution: string
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

// Mock authentication - in production, replace with real auth service
export const mockUsers: Record<string, User & { password: string }> = {
  "admin@school.edu": {
    id: "1",
    email: "admin@school.edu",
    password: "admin123",
    name: "Sarah Johnson",
    role: "admin",
    institution: "Springfield High School",
  },
  "teacher@school.edu": {
    id: "2",
    email: "teacher@school.edu",
    password: "teacher123",
    name: "Michael Chen",
    role: "teacher",
    institution: "Springfield High School",
  },
  "counselor@school.edu": {
    id: "3",
    email: "counselor@school.edu",
    password: "counselor123",
    name: "Emily Rodriguez",
    role: "counselor",
    institution: "Springfield High School",
  },
}

export async function signIn(email: string, password: string): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers[email]
  if (!user || user.password !== password) {
    throw new Error("Invalid email or password")
  }

  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function signUp(userData: {
  email: string
  password: string
  name: string
  role: UserRole
  institution: string
}): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (mockUsers[userData.email]) {
    throw new Error("User already exists")
  }

  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    name: userData.name,
    role: userData.role,
    institution: userData.institution,
  }

  // In production, this would be saved to database
  mockUsers[userData.email] = { ...newUser, password: userData.password }

  return newUser
}

export function signOut(): void {
  // Clear any stored tokens/session data
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-user")
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem("auth-user")
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem("auth-user", JSON.stringify(user))
  } else {
    localStorage.removeItem("auth-user")
  }
}
