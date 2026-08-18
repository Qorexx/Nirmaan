import { login } from './actions'

export default function LoginPage({ searchParams }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-20 mx-auto">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In to Nirmaan</h1>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          formAction={login}
          className="bg-green-700 rounded-md px-4 py-2 text-white mb-2 hover:bg-green-600 transition"
        >
          Sign In
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account? <a href="/signup" className="underline">Sign up</a>
        </p>
        
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-red-900/50 text-red-200 border border-red-800 text-center rounded-md">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
