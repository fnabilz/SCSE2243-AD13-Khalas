'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  FileInput,
  FileChartLine,
} from 'lucide-react'
import '@/app/globals.css'

const navItems = [
  { name: 'Dashboard', href: '/homepage/dashboard', icon: LayoutDashboard },
  { name: 'Analytics', href: '/homepage/analytics', icon: BarChart3 },
  { name: 'Submit Data', href: '/homepage/submit-data', icon: FileInput },
  { name: 'Generate Report', href: '/homepage/generate-report', icon: FileChartLine },
  { name: 'Manage KPI', href: '/homepage/manage-kpi', icon: Settings },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-blue-1">
        {/* Sidebar Header / Brand */}
        <div className="flex h-16 items-center px-6 mt-3">
            <div>
                <Image 
                    className="w-60 h-16 py-2"
                    src="/semai-logo.svg"
                    width={120}
                    height={64}          
                    alt="Logo of the system"
                    priority             
                />
            </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4 py-3">
          {
            (navItems.map((page) => {
              const Icon = page.icon
              const isActive = pathname === page.href || pathname.startsWith(`${page.href}/`)

              return (
                <Link 
                  key={page.name}
                  href={page.href} 
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium transition-colors ${
                    isActive 
                      ? 'text-white bg-white/25' // ACTIVE STYLE
                      : 'text-white hover:bg-slate-50 hover:text-slate-900'      // INACTIVE STYLE
                  }`}
                >
                  <Icon className={`h-5 w-5`} />
                  {page.name}
                </Link>
              )
            }))
          }
        </nav>

        {/* Sidebar Footer */}
        <p className="text-center text-xs text-gray-400 font-medium px-4 py-6">
          THE KHALAS© 2026
        </p>
      </aside>
    )
}