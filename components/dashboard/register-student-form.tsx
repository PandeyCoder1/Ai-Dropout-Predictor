"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function RegisterStudentForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    grade: "",
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const { toast } = useToast();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCredentials(null);
    try {
      const res = await fetch("/api/auth/register-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setCredentials({ email: data.email, password: data.password });
      toast({
        title: "Student registered!",
        description: "Credentials generated.",
      });
      setForm({ name: "", email: "", grade: "" });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (credentials) {
      navigator.clipboard.writeText(
        `Email: ${credentials.email}\nPassword: ${credentials.password}`
      );
      toast({
        title: "Copied!",
        description: "Credentials copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="grade">Grade</Label>
          <Input
            id="grade"
            value={form.grade}
            onChange={(e) => handleChange("grade", e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Registering..." : "Register Student"}
        </Button>
      </form>
      {credentials && (
        <div className="p-4 border rounded bg-muted">
          <div className="mb-2 font-medium">Student Credentials</div>
          <div className="mb-1 text-sm">
            Email: <span className="font-mono">{credentials.email}</span>
          </div>
          <div className="mb-2 text-sm">
            Password: <span className="font-mono">{credentials.password}</span>
          </div>
          <Button size="sm" onClick={handleCopy}>
            Copy Credentials
          </Button>
        </div>
      )}
    </div>
  );
}
