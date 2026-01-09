export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Riley Bennett Egloff LLP</h1>
        <p className="text-xl mb-8">Website Migration in Progress</p>
        <div className="space-y-2">
          <p>✅ Phase 1: Core Infrastructure - In Progress</p>
          <p className="text-sm text-gray-600">
            Admin UI available at{' '}
            <a href="/admin" className="text-blue-600 hover:underline">
              /admin
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
