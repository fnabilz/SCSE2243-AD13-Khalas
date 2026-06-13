import { 
  ArrowRight, 
  Import, 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  FileInput,
  FileChartLine,
  Plus,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import '@/app/globals.css'
import Image from 'next/image'
import logo_image from '../../public/semai-logo.svg'

export default function DashboardPage() {
  return (
    <div className='flex min-h-screen w-full bg-slate-50 text-slate-900 font-sans'>
      
      {/* 1. SIDEBAR */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-blue-1">
        {/* Sidebar Header / Brand */}
        <div className="flex h-16 items-center px-6 border-b border-blue-4">
            <div >
                <Image 
                    className='w-60 h-16 py-2'
                    src={logo_image}
                    width={120}
                    alt="Logo of the system"
                />
            </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          <Link href="#" className="flex items-center gap-3 rounded-lg bg-blue-5 px-3 py-2.5 text-md font-medium text-white transition-colors">
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <BarChart3 className="h-5 w-5" />
            Analytics
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileInput className="h-5 w-5" />
            Submit Data
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <FileChartLine className="h-5 w-5" />
            Generate Report
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-md font-medium text-white hover:bg-slate-50 hover:text-slate-900 transition-colors">
            <Settings className="h-5 w-5" />
            Manage KPI
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <p className="text-center text-xs text-gray-400 font-medium px-4 py-6">
          THE KHALAS© 2026
        </p>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex flex-1 flex-col pl-64">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-end border-b border-slate-200 bg-white px-8">
         

          {/* Right Header Controls */}
          <div className="flex items gap-4">
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

        {/* Dashboard Main Workspace */}
        <main className="flex-1 p-8 space-y-8 max-w-7xl w-full mx-auto">

          {/* Welcome / Action Banner Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
              <p className="text-sm text-slate-500 mt-1">Welcome back! Here is a summary of SemAI's system health today.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="flex items-center gap-2 text-slate-700 border-slate-300 hover:bg-slate-50">
                <Import className="h-4 w-4" /> Import Logs
              </Button>
              <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium">
                <Plus className="h-4 w-4" /> Create Report
              </Button>
            </div>
          </div>

          {/* 3. METRIC CARDS ROW */}
           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Total Models Run</span>
                <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" /> +12%
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">1,248</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">API Request Rate</span>
                <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  <TrendingUp className="h-3 w-3" /> +4.3%
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">99.8%</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Active Node Tokens</span>
                <span className="text-xs font-medium text-slate-400">Live</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">42.1k</span>
              </div>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">System Cost (MTD)</span>
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">-2.4%</span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-zinc-900">$1,432</span>
              </div>
            </div>
          </div>

          {/* 4. RECENT ACTIVITY TABLE CONTAINER */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 p-6 gap-4">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">Recent Integrations</h3>
                <p className="text-xs text-slate-400 mt-0.5">A comprehensive tracking history of active model pipelines.</p>
              </div>
              <Button variant="ghost" className="text-xs text-green-700 hover:text-green-800 hover:bg-green-50 flex items-center gap-1">
                View All Pipelines <ArrowRight className="h-3 w-3" />
              </Button>
            </div>

            {/* Table Mockup */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-3">Pipeline ID</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Accuracy Metric</th>
                    <th className="px-6 py-3">Runtime</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">#SEM-9041</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">98.42%</td>
                    <td className="px-6 py-4 text-slate-400">14 mins ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-zinc-900">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">#SEM-8832</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">96.11%</td>
                    <td className="px-6 py-4 text-slate-400">2 hours ago</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-zinc-900">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-zinc-900">#SEM-8109</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                        Queued
                      </span>
                    </td>
                    <td className="px-6 py-4">--</td>
                    <td className="px-6 py-4 text-slate-400">Yesterday</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-zinc-900">
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

    </div>
  )
}