export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b">
        <h1 className="text-2xl font-bold">Sumi</h1>

        <div className="flex gap-4">
          <a
            href="/login"
            className="px-4 py-2 rounded-lg border"
          >
            Login
          </a>

          <a
            href="/register"
            className="px-4 py-2 rounded-lg bg-black text-white"
          >
            Get Started
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24 text-center">
        <h1 className="text-6xl font-bold mb-6">
          Create Manga Together
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Sumi is a collaborative manga creation platform that helps
          writers, artists, and teams build stories together in one place.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/register"
            className="px-6 py-3 rounded-lg bg-black text-white font-medium"
          >
            Start Creating
          </a>

          <a
            href="/login"
            className="px-6 py-3 rounded-lg border font-medium"
          >
            Sign In
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Manga Editor
            </h3>

            <p className="text-gray-600">
              Build manga pages using panels, speech bubbles,
              and text tools.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Project Management
            </h3>

            <p className="text-gray-600">
              Organize projects, chapters, and pages in a
              structured workflow.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Team Collaboration
            </h3>

            <p className="text-gray-600">
              Work together with artists, writers, and editors
              in real time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 py-24 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to tell your story?
        </h2>

        <p className="text-gray-600 mb-8">
          Create your first manga project today.
        </p>

        <a
          href="/register"
          className="px-6 py-3 rounded-lg bg-black text-white font-medium"
        >
          Get Started
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-gray-500">
        © 2026 Sumi. All rights reserved.
      </footer>
    </div>
  );
}