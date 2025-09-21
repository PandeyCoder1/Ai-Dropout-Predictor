import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, name, role, institution } = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection("users").findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }
  const hashedPassword = await hash(password, 10);
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
    name,
    role,
    institution,
  });
  return NextResponse.json({
    user: {
      id: result.insertedId.toString(),
      email,
      name,
      role,
      institution,
    },
  });
}
