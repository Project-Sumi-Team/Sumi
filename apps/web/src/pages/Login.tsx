import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login, saveToken } from "../lib/auth";
import {api, endpoints} from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await login({ email, password });
      saveToken(response.access_token);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const result = await api(
    endpoints.auth.login,{
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );

  localStorage.setItem(
    "authToken",
    result.access_token
  )
    navigate("/dashboard");
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#f1f5f9_60%,_#e2e8f0)] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 lg:flex-row lg:items-center">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur">
          <Link to="/" className="text-sm font-semibold tracking-[0.2em] text-slate-500">
            SUMI
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
            Welcome back
          </h1>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Sign in to reopen your projects and continue where you left off.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                required
                autoComplete="current-password"
              />
            </div>

            {error ? <p className="text-sm text-red-600">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-medium text-slate-900 hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <div className="max-w-lg rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Why creators love Sumi</p>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">Keep each project focused with a clean, distraction-free workspace.</li>
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">Jump back into your latest chapter in seconds.</li>
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">Move from brainstorming to publishing with fewer clicks.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}