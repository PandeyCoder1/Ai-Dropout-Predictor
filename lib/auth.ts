"use client";

export type UserRole = "student"|"admin" | "teacher" | "counsellor" | "parent";


import clientPromise from "./mongodb";
import { ObjectId } from "mongodb";
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  institution: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
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
    role: "counsellor",
    institution: "Springfield High School",
  },
};

export async function signIn(email: string, password: string): Promise<User> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }
  return data.user;
}

export async function signUp(userData: {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  institution: string;
}): Promise<User> {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Signup failed");
  }
  return data.user;
}

// Registring students by admin(schools) 
export async function registerStudentByAdmin(studentData: {
  email: string
  password: string
  name: string
  institution: string
}): Promise<User> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (mockUsers[studentData.email]) {
    throw new Error("Student already exists")
  }

  const newStudent: User = {
    id: Date.now().toString(),
    email: studentData.email,
    name: studentData.name,
    role: "student",
    institution: studentData.institution,
  }

  mockUsers[studentData.email] = { ...newStudent, password: studentData.password }

  return newStudent
}

export function signOut(): void {
  // Clear any stored tokens/session data
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-user");
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("auth-user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return;

  if (user) {
    localStorage.setItem("auth-user", JSON.stringify(user));
  } else {
    localStorage.removeItem("auth-user");
  }
}
