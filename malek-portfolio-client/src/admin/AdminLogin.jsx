import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      const redirectTo = location.state?.from ?? "/admin";
      navigate(redirectTo, { replace: true });
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <Card className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-accent">
            <Lock size={20} />
          </span>
          <h1 className="mt-4 font-heading text-xl font-semibold text-white">Admin Login</h1>
          <p className="mt-1 text-sm text-secondary">Sign in to manage site content.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm text-secondary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full rounded-lg border border-white/10 bg-background px-4 py-2.5 text-sm text-white outline-none transition-colors duration-200 focus:border-accent"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loader2 size={16} className="animate-spin" /> : null}
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}
