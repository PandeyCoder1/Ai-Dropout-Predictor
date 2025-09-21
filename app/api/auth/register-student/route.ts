import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

function generatePassword(length = 8) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function POST(req: NextRequest) {
  const { name, email, grade } = await req.json();
  if (!name || !email || !grade) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const password = generatePassword(10);
  const hashedPassword = await hash(password, 10);
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    role: "student",
    grade,
  });
  return NextResponse.json({
    id: result.insertedId.toString(),
    email,
    password,
  });
}
