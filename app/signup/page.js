import { signup } from '../login/actions'

export default function SignupPage({ searchParams }) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mt-20 mx-auto">
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <h1 className="text-2xl font-bold text-center mb-6">Create Nirmaan Account</h1>
        
        <label className="text-md" htmlFor="full_name">
          Full Name / Organization
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
          name="full_name"
          placeholder="Acme Construction"
          required
        />

        <label className="text-md" htmlFor="role">
          Account Type
        </label>
        <select 
          className="rounded-md px-4 py-2 bg-black border border-gray-700 mb-4 text-white"
          name="role"
          required
        >
          <option value="contractor">Contractor (Builder)</option>
          <option value="government">Government (Inspector/Funder)</option>
        </select>

        <label className="text-md" htmlFor="wallet_address">
          Wallet Address (EVM)
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4 font-mono text-sm"
          name="wallet_address"
          placeholder="0x..."
          required
        />

        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-4"
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
          formAction={signup}
          className="bg-blue-600 rounded-md px-4 py-2 text-white mb-2 hover:bg-blue-500 transition"
        >
          Sign Up
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <a href="/login" className="underline">Sign in</a>
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
