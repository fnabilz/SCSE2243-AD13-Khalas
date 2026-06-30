"use client"

import { useState } from 'react'
import { Search, Edit3, Check, AlertTriangle } from 'lucide-react'

interface KPI {
  id: string;
  district: string;
  targetValue: number;
  currentValue: number;
  unit: string;
}

export default function ManageKPIs() {
  // Main state holding the essential progress metrics for Johor districts
  const [kpis, setKpis] = useState<KPI[]>([
    { id: '1', district: 'MBJB', targetValue: 150000, currentValue: 110000, unit: 'Trees' },
    { id: '2', district: 'MPM', targetValue: 80000, currentValue: 62000, unit: 'Saplings' },
    { id: '3', district: 'MDKS', targetValue: 120000, currentValue: 34320, unit: 'Trees' },
    { id: '4', district: 'MDS', targetValue: 90000, currentValue: 45000, unit: 'Trees' },
  ]);

  const [search, setSearch] = useState('');

  // Inline adjustment state handlers
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTargetValue, setEditTargetValue] = useState<number>(0);

  const handleSaveEdit = (id: string) => {
    setKpis(kpis.map(k => k.id === id ? { ...k, targetValue: editTargetValue } : k));
    setEditingId(null);
  };

  const filteredKpis = kpis.filter(kpi => 
    kpi.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex-1 p-8 space-y-8 w-full bg-slate-50 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Manage District KPIs</h1>
        <p className="text-sm text-slate-500 mt-1">Review performance tracking benchmarks across Johor municipal bounds.</p>
      </div>

      {/* Simplified Filter Toolkit */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* KPI Directives Data Sheet */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">District Scope</th>
                <th className="py-4 px-6">Current Progress Benchmark</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredKpis.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-8 text-gray-400 italic">
                    No matching district scope found.
                  </td>
                </tr>
              ) : (
                filteredKpis.map((kpi) => {
                  const percentage = Math.min(Math.round((kpi.currentValue / kpi.targetValue) * 100), 100);
                  const isLowProgress = percentage < 40;

                  return (
                    <tr key={kpi.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-bold text-gray-900">{kpi.district}</td>
                      <td className="py-4 px-6">
                        <div className="w-full max-w-md space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              {kpi.currentValue.toLocaleString()} / {' '}
                              {editingId === kpi.id ? (
                                <span className="inline-flex items-center gap-1">
                                  <input
                                    type="number"
                                    value={editTargetValue}
                                    onChange={(e) => setEditTargetValue(Number(e.target.value))}
                                    className="w-20 p-0.5 border border-blue-500 rounded text-xs outline-none"
                                  />
                                  <span>{kpi.unit}</span>
                                </span>
                              ) : (
                                <span>{kpi.targetValue.toLocaleString()} {kpi.unit}</span>
                              )}
                            </span>
                            <span className={`font-semibold flex items-center gap-0.5 ${isLowProgress ? 'text-red-500' : 'text-gray-700'}`}>
                              {isLowProgress && <AlertTriangle className="w-3 h-3" />}
                              {percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${isLowProgress ? 'bg-rose-500' : 'bg-green-600'}`} 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {editingId === kpi.id ? (
                            <button 
                              onClick={() => handleSaveEdit(kpi.id)} 
                              className="p-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition"
                              title="Save Changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                setEditingId(kpi.id);
                                setEditTargetValue(kpi.targetValue);
                              }}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Recalibrate Target"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}