
import { ArrowRight, Import} from 'lucide-react'
import { Button } from '@/components/button'
import Link from 'next/link'
import '@/app/globals.css'

export default function Page() {
    return (
        <div className='flex grow items-center justify-center px-4 py-12 bg-white'>
            {/*White*/}

            {/* The Card Container */}
            <div className='w-full max-w-md space-y-8 rounded-2xl border border-slate-400/30 bg-slate-200/40 p-8 backdrop-blur-md shadow-xl text-slate-900'>
                
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Enter your credentials to access SemAI
                    </p>
                </div>

                {/* Form */}
                <form className="mt-8 space-y-6" action="/homepage/dashboard" method="POST">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-800/20 bg-white/10 px-3 py-2 text-black placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-zinc-900">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="mt-1 block w-full rounded-lg border border-gray-800/20 bg-white/10 px-3 py-2 text-black placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-gray-500">
                            Remember me
                        </label>
                        </div>
                        <a href="/contact-admin" className="font-medium text-green-600 hover:text-green-500">
                        Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-700 py-2.5 font-semibold text-white transition-colors hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
                    >
                        Sign In
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm text-gray-400">
                    THE KHALAS© 2026
                </p>
            </div>
        </div>
    )
}