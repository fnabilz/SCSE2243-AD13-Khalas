"use client"

import { useState } from 'react'
import { Search, Edit3, Check, AlertTriangle } from 'lucide-react'
import { districtData } from '@/data/districts'

interface KPI {
  id: string;
  district: string;
  targetValue: number;
  currentValue: number;
  unit: string;
}

export default function ManageKPIs() {
  // Initialize from your shared districts data structure cleanly
  const [kpis, setKpis] = useState<KPI[]>(() =>
    districtData.map((d, index) => ({
      id: String(index + 1),
      district: d.district,
      targetValue: d.target,
      currentValue: d.planted,
      unit: 'Trees'
    }))
  );

  const [search, setSearch] = useState('');

  // Inline configuration adjustment state handlers
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTargetValue, setEditTargetValue] = useState<string>('0'); // Changed to string to handle clean input updates

  const handleStartEdit = (id: string, initialValue: number) => {
    setEditingId(id);
    setEditTargetValue(String(initialValue));
  };

  const handleSaveEdit = (id: string) => {
    const parsedValue = Number(editTargetValue);
    // Secure numerical fallback safety check
    if (!isNaN(parsedValue) && parsedValue > 0) {
      setKpis(prevKpis => 
        prevKpis.map(k => k.id === id ? { ...k, targetValue: parsedValue } : k)
      );
    }
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
        <p className="text-sm text-slate-500 mt-1">Review performance tracking progress across Johor municipal scopes.</p>
      </div>

      {/* Filter Search Input */}
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
                <th className="py-4 px-6">Target Planted</th>
                <th className="py-4 px-6">Progress</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredKpis.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400 italic">
                    No matching district scope found.
                  </td>
                </tr>
              ) : (
                filteredKpis.map((kpi) => {
                  const percentage = Math.min(Math.round((kpi.currentValue / kpi.targetValue) * 100), 100);
                  const isLowProgress = percentage < 40;

                  return (
                    <tr key={kpi.id} className="hover:bg-slate-50/80 transition">
                      {/* District Column */}
                      <td className="py-4 px-6 font-bold text-gray-900">{kpi.district}</td>
                      
                      {/* Target Planted Column */}
                      <td className="py-4 px-6 text-slate-700 font-medium">
                        {kpi.targetValue.toLocaleString()} {kpi.unit}
                      </td>
                      
                      {/* Progress Bar Column */}
                      <td className="py-4 px-6">
                        <div className="w-full max-w-md space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500 font-medium">
                              {kpi.currentValue.toLocaleString()} / {' '}
                              {editingId === kpi.id ? (
                                <span className="inline-flex items-center gap-1 bg-white p-0.5 border border-blue-400 rounded shadow-sm">
                                  <input
                                    type="number"
                                    value={editTargetValue}
                                    onChange={(e) => setEditTargetValue(e.target.value)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveEdit(kpi.id);
                                    }}
                                    className="w-20 p-0.5 rounded text-xs outline-none font-semibold text-zinc-900"
                                    autoFocus
                                  />
                                  <span className="text-gray-500 pr-1 text-xs">{kpi.unit}</span>
                                </span>
                              ) : (
                                <span>{kpi.targetValue.toLocaleString()} {kpi.unit}</span>
                              )}
                            </span>
                            
                            <span className={`font-semibold flex items-center gap-1 text-sm ${isLowProgress ? 'text-rose-600' : 'text-zinc-800'}`}>
                              {isLowProgress && <AlertTriangle className="w-3.5 h-3.5" />}
                              {percentage}%
                            </span>
                          </div>
                          
                          <div className="w-full bg-gray-100 rounded-full h-2.5 shadow-inner">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-500 ${isLowProgress ? 'bg-rose-500' : 'bg-green-600'}`} 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {editingId === kpi.id ? (
                            <button 
                              onClick={() => handleSaveEdit(kpi.id)} 
                              className="p-1.5 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition shadow-sm border border-green-200"
                              title="Save Changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleStartEdit(kpi.id, kpi.targetValue)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Edit Target"
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