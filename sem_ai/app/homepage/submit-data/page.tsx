"use client"

import { Plus, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SubmitReportPage() {
  const steps = ["Zone", "Agency", "Species", "Quantity", "Date"]

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

        {/* Progress Strip */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-4">
                  <div className="w-6 h-8 rounded-full text-xs font-bold flex items-center justify-center bg-slate-100 text-slate-400">
                    {i + 1}
                  </div>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{step}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-9 h-0.8 mx-4 bg-slate-100" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 p-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900">Planting Details</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                All fields are required before submission.
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100">

            {/* Zone */}
            <section className="p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                📍 Planting Zone
              </p>

              {/* Map placeholder */}
              <div
                className="relative h-46 rounded-xl overflow-hidden border border-slate-200"
                style={{ background: "linear-gradient(135deg, #d9edd7 0%, #b5d9bb 50%, #8ec99b 100%)" }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-white/70 backdrop-blur-sm px-6 py-2 rounded-full pointer-events-none">
                  <p className="text-xs text-slate-600">Interactive map — click to pin zone</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">or use the dropdown below</p>
                </div>
                {[
                  { top: "28%", left: "38%", label: "JB Utara" },
                  { top: "55%", left: "62%", label: "Pasir Gudang" },
                  { top: "42%", left: "28%", label: "Pontian" },
                  { top: "20%", left: "55%", label: "Kulai" },
                ].map((pin) => (
                  <div
                    key={pin.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-green-700 border-2 border-white shadow-[0_0_0_3px_rgba(21,128,61,0.25)] group-hover:scale-150 transition-transform" />
                    <span className="text-[10px] font-semibold bg-green-900 text-white px-1.5 py-0.5 rounded mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {pin.label}
                    </span>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Zone</label>
                <div className="relative">
                  <select className="w-full appearance-none px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-400 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition">
                    <option value="" disabled selected>Select zone…</option>
                    <option>Johor Bahru Utara</option>
                    <option>Johor Bahru Selatan</option>
                    <option>Kulai</option>
                    <option>Pasir Gudang</option>
                    <option>Pontian</option>
                    <option>Batu Pahat</option>
                    <option>Kluang</option>
                    <option>Mersing</option>
                    <option>Muar</option>
                    <option>Segamat</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </section>

            {/* Agency */}
            <section className="p-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                🏛 Agency Involved
              </p>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Agency</label>
                <div className="relative">
                  <select className="w-full appearance-none px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-400 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition">
                    <option value="" disabled selected>Select agency…</option>
                    <option>Majlis Bandaraya Johor Bahru (MBJB)</option>
                    <option>Majlis Perbandaran Johor Bahru Tengah (MPJBT)</option>
                    <option>Majlis Perbandaran Kulai (MPKulai)</option>
                    <option>Majlis Perbandaran Pasir Gudang (MPPG)</option>
                    <option>Majlis Perbandaran Pontian (MPPontian)</option>
                    <option>Majlis Perbandaran Batu Pahat (MPBP)</option>
                    <option>Majlis Daerah Kluang (MDKluang)</option>
                    <option>Majlis Daerah Mersing (MDMersing)</option>
                    <option>Majlis Daerah Muar (MDMuar)</option>
                    <option>Majlis Daerah Segamat (MDSegamat)</option>
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </section>

            {/* Species */}
            <section className="p-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                🌱 Tree Species
              </p>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1.5">Species</label>
                <div className="relative">
                  <select className="w-full appearance-none px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg bg-white text-slate-400 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 transition">
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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                <button className="mt-2.5 flex items-center gap-1 text-xs font-medium text-green-700 hover:text-green-800 transition">
                  <Plus className="h-3 w-3" /> Add new species not in list
                </button>
              </div>
            </section>

            {/* Quantity + Date */}
            <section className="p-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                🔢 Quantity & 📅 Date
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Number of Trees Planted
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 150"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 hover:border-slate-300 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1.5">
                    Date of Planting Activity
                  </label>
                  <input
                    type="date"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600/10 hover:border-slate-300 transition text-slate-400"
                  />
                </div>
              </div>
            </section>

          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4 bg-slate-50">
            <Button variant="ghost" className="text-xs text-slate-600 hover:text-zinc-900 hover:bg-slate-100">
              Clear Form
            </Button>
            <Button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-medium">
              <Plus className="h-4 w-4" /> Submit Planting Report
            </Button>
          </div>
        </div>

      </main>
    </div>
  )
}