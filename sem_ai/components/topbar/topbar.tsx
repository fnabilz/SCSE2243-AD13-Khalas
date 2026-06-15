import '@/app/globals.css'
import Link from 'next/dist/client/link'
import { LogOut } from 'lucide-react'

export default function TopBar() {
    return (
        <div className='flex flex-1 flex-col'>
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-end border-b border-slate-200 bg-white px-8"> 

            {/* Right Header Controls */}
            <div className="flex items-center gap-4">
            <button className="relative rounded-full p-1.5 text-red-600 hover:bg-slate-50 hover:text-slate-600">
                <Link href="/">
                <LogOut className="h-5 w-5" />
                </Link>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            
            {/* User Profile Info */}
            <div className="flex items-center gap-3">
                <div className="flex flex-col text-right">
                <span className="text-sm font-semibold text-zinc-900">Admin User</span>
                <span className="text-xs text-slate-400">admin@semai.com</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-linear-to-tr from-green-600 to-emerald-500 flex items-center justify-center text-sm font-bold text-white">
                AU
                </div>
            </div>
            </div>
        </header>
    </div>
    )
}