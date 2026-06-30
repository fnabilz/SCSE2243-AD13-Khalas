"use client"

import { Plus, Upload } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/button'

export default function SubmitReportPage() {
  const steps = ["Zone", "Agency", "Species", "Quantity", "Date"]

  // Mock Fake Backend State: Simulating a user logged in under the 'Pontian' PBT
  const [currentUserPBT] = useState("MPPn (Pontian)")

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 p-8 space-y-8 w-full bg-slate-50">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Submit Report</h1>
            <p className="text-sm text-slate-500 mt-1">
              Fill in the planting details below to log a new tree plantation entry.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium">
              <Upload className="h-4 w-4" /> Bulk Upload (CSV / Excel)
            </Button>
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 p-6 gap-4">
            <div>
              <h3 className="text-xl font-semibold text-zinc-900">Planting Details</h3>
              <p className="text-sm text-slate-500 mt-1">
                All fields are required before submission.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">

            {/* Zone - Locked to Current Logged In User */}
            <section className="p-8 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                📍 Planting Zone
              </p>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Zone (Auto-assigned)</label>
                <div className="relative">
                  <input 
                    type="text" 
                    readOnly 
                    value={currentUserPBT}
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg bg-slate-100 text-slate-500 font-medium cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </section>

            {/* Agency - Changed to Open Text */}
            <section className="p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                🏛 Agency Involved
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Agency Name</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Enter full agency name..."
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg bg-white text-zinc-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition"
                  />
                </div>
              </div>
            </section>

            {/* Species */}
            <section className="p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                🌱 Tree Species
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Species</label>
                <div className="relative">
                  <select className="w-full appearance-none px-4 py-3 text-base border border-slate-200 rounded-lg bg-white text-slate-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition">
                    <option value="" disabled selected>Select species…</option>
                    <option>Angsana (Pterocarpus indicus)</option>
                    <option>Rain Tree (Samanea saman)</option>
                    <option>Tembusu (Fagraea fragrans)</option>
                    <option>Yellow Flame (Peltophorum pterocarpum)</option>
                    <option>Sea Apple (Syzygium grande)</option>
                    <option>Simpoh Air (Dillenia suffruticosa)</option>
                    <option>Kelat Paya (Syzygium palembanicum)</option>
                    <option>Pulai (Alstonia angustiloba)</option>
                    <option>Meranti Merah (Shorea leprosula)</option>
                    <option>Kapur (Dryobalanops aromatica)</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <button className="mt-3 flex items-center gap-1 text-sm font-medium text-green-700 hover:text-green-800 transition">
                  <Plus className="h-4 w-4" /> Add new species not in list
                </button>
              </div>
            </section>

            {/* Quantity + Date */}
            <section className="p-6 space-y-4">
              <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                🔢 Quantity & 📅 Date
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Number of Trees Planted
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 hover:border-slate-300 transition text-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">
                    Date of Planting Activity
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 text-base border border-slate-200 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 hover:border-slate-300 transition text-slate-700"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 border-t border-slate-100 px-6 py-5 bg-slate-50">
            <Button variant="ghost" className="text-sm text-slate-600 hover:text-zinc-900 hover:bg-slate-100 px-4 py-2.5">
              Clear Form
            </Button>
            <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium text-sm px-6 py-2.5">
              <Plus className="h-4 w-4" /> Submit Planting Report
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}