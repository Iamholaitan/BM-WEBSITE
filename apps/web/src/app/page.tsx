export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900">
          BM Global Investment
        </h1>
        <p className="text-lg text-gray-600 max-w-md mx-auto">
          Shipping & Logistics Platform
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Login
          </a>
          <a
            href="/api/docs"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            API Docs
          </a>
        </div>
      </div>
    </main>
  );
}
