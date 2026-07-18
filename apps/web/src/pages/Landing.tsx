import { Link } from "react-router-dom";

const features = [
  {
    title: "Manga editor",
    text: "Shape pages with clear panels, dialogue, and visual flow in one place.",
  },
  {
    title: "Structured projects",
    text: "Keep chapters, pages, and ideas organized without losing momentum.",
  },
  {
    title: "Team-friendly",
    text: "Bring writers and artists together with a calm, focused workspace.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#f8fafc,_#f1f5f9_60%,_#e2e8f0)] text-slate-900">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          Sumi
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur sm:p-10">
          <div className="mb-5 inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600">
            Create manga with clarity
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Turn your story ideas into a polished manga workflow.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Sumi gives writers, artists, and editors a calm place to build projects,
            structure chapters, and ship pages without the usual chaos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Start creating
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Sign in
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900 p-8 text-white shadow-sm sm:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-300">What you can do</p>
          <ul className="mt-6 space-y-4 text-sm text-slate-300">
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
              Draft story beats and keep every chapter in one place.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
              Build pages with a streamlined editor experience.
            </li>
            <li className="rounded-2xl border border-white/10 bg-white/10 p-4">
              Share progress with your team without losing focus.
            </li>
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 lg:px-8 lg:py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 lg:px-8 lg:py-16">
        <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm sm:px-12">
          <h2 className="text-3xl font-semibold tracking-tight">Ready to tell your story?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Start a new project today and bring your next manga chapter to life.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Create your first project
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © 2026 Sumi. All rights reserved.
      </footer>
    </div>
  );
}