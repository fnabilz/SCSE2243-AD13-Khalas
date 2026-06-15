import Link from 'next/link'
import '@/app/globals.css'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  FileInput,
  FileChartLine,
} from 'lucide-react'

export default function Sidebar() {
    return (
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-blue-1">
        {/* Sidebar Header / Brand */}
        <div className="flex h-16 items-center px-6 border-b border-blue-4">
            <div>
                <Image 
                    className="w-60 h-16 py-2"
                    src="/semai-logo.svg" // ✅ FIXED: Direct path from the public folder root
                    width={120}
                    height={64}          // ✅ FIXED: Added mandatory height prop to prevent layout shifts
                    alt="Logo of the system"
                    priority             // ✅ OPTIMIZATION: Helps load above-the-fold brand assets faster
                />
            </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <Link href="/homepage/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/homepage/analytics" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <BarChart3 className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="/homepage/submit-data" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileInput className="h-5 w-5" />
            Submit Data
          </Link>
          <Link href="/homepage/generate-report" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileChartLine className="h-5 w-5" />
            Generate Report
          </Link>
          <Link href="/homepage/manage-kpi" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="h-5 w-5" />
            Manage KPI
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <p className="text-center text-xs text-gray-400 font-medium px-4 py-6">
          THE KHALAS© 2026
        </p>
      </aside>
    )
}