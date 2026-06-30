"use client"

import { useState } from 'react'
import { Plus, Search, Filter, Edit3, Trash2, Check, Sliders, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/button'
import { districtData } from '@/data/districts'

interface KPI {
  id: string;
  district: string;
  metric: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  category: "Planting" | "Survival Rate" | "Community Outreach";
}

export default function ManageKPIs() {
  // Mock initialized state matching current district metrics
  const [kpis, setKpis] = useState<KPI[]>([
    { id: '1', district: 'MBJB', metric: 'Urban Tree Planting', targetValue: 150000, currentValue: 110000, unit: 'Trees', category: 'Planting' },
    { id: '2', district: 'MPM', metric: 'Mangrove Restoration', targetValue: 80000, currentValue: 62000, unit: 'Saplings', category: 'Planting' },
    { id: '3', district: 'MDKS', metric: 'Kluang Reforestation', targetValue: 120000, currentValue: 34320, unit: 'Trees', category: 'Planting' },
    { id: '4', district: 'MDS', metric: 'Segamat Green Canopy', targetValue: 90000, currentValue: 45000, unit: 'Trees', category: 'Planting' },
    { id: '5', district: 'MBJB', metric: 'Plant Survival Rate Guarantee', targetValue: 95, currentValue: 89, unit: '%', category: 'Survival Rate' },
  ]);

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  // Form States for creating a new KPI
  const [isAdding, setIsAdding] = useState(false);
  const [newDistrict, setNewDistrict] = useState('MBJB');
  const [newMetric, setNewMetric] = useState('');
  const [newTarget, setNewTarget] = useState('');
  const [newUnit, setNewUnit] = useState('Trees');
  const [newCategory, setNewCategory] = useState<'Planting' | 'Survival Rate' | 'Community Outreach'>('Planting');

  // Inline editing state handlers
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTargetValue, setEditTargetValue] = useState<number>(0);

  const handleAddKPI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMetric || !newTarget) return;

    const newKpiItem: KPI = {
      id: Date.now().toString(),
      district: newDistrict,
      metric: newMetric,
      targetValue: Number(newTarget),
      currentValue: 0,
      unit: newUnit,
      category: newCategory
    };

    setKpis([newKpiItem, ...kpis]);
    setIsAdding(false);
    setNewMetric('');
    setNewTarget('');
  };

  const handleSaveEdit = (id: string) => {
    setKpis(kpis.map(k => k.id === id ? { ...k, targetValue: editTargetValue } : k));
    setEditingId(null);
  };

  const handleDeleteKPI = (id: string) => {
    if(confirm("Are you sure you want to delete this KPI target?")) {
      setKpis(kpis.filter(k => k.id !== id));
    }
  };

  const filteredKpis = kpis.filter(kpi => {
    const matchesSearch = kpi.district.toLowerCase().includes(search.toLowerCase()) || 
                          kpi.metric.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || kpi.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 p-8 space-y-8 w-full bg-slate-50 animate-fadeIn">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Manage District KPIs</h1>
          <p className="text-sm text-slate-500 mt-1">Configure, recalibrate, and establish strategic environment metrics across Johor.</p>
        </div>
        <Button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          <Plus className="h-4 w-4" /> {isAdding ? "Close Panel" : "Assign New KPI"}
        </Button>
      </div>

      {/* Slide-out / Expandable Creation Form Panel */}
      {isAdding && (
        <div className="bg-white rounded-xl border border-blue-200 p-6 shadow-sm transition duration-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assign Strategic Target</h3>
          <form onSubmit={handleAddKPI} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">District Scope</label>
              <select 
                value={newDistrict} 
                onChange={(e) => setNewDistrict(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                {districtData.map(d => <option key={d.district} value={d.district}>{d.district}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Metric Name</label>
              <input 
                type="text" 
                placeholder="e.g. Urban Canopy Expansion" 
                value={newMetric}
                onChange={(e) => setNewMetric(e.target.value)}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Category</label>
              <select 
                value={newCategory} 
                onChange={(e) => setNewCategory(e.target.value as any)}
                className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Planting">Planting</option>
                <option value="Survival Rate">Survival Rate</option>
                <option value="Community Outreach">Community Outreach</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">Target Volume</label>
              <div className="flex gap-1">
                <input 
                  type="number" 
                  placeholder="100000" 
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select 
                  value={newUnit} 
                  onChange={(e) => setNewUnit(e.target.value)}
                  className="border border-gray-300 rounded-lg text-sm bg-gray-50 p-2"
                >
                  <option value="Trees">Trees</option>
                  <option value="Saplings">Saplings</option>
                  <option value="%">%</option>
                </select>
              </div>
            </div>
            <div>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-2.5">
                Save Directive
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Filtering Toolkit Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by district or metric..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <span className="flex items-center gap-1 text-xs text-gray-500 font-medium whitespace-nowrap"><Filter className="w-3.5 h-3.5" /> Filter Category:</span>
          {['All', 'Planting', 'Survival Rate', 'Community Outreach'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                categoryFilter === cat ? 'bg-zinc-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Directives Data Sheet */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">District Scope</th>
                <th className="py-4 px-6">KPI Tracking Directive</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Target Threshold</th>
                <th className="py-4 px-6">Current Progress Benchmark</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredKpis.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-400 italic">No matching district directives found.</td>
                </tr>
              ) : (
                filteredKpis.map((kpi) => {
                  const percentage = Math.min(Math.round((kpi.currentValue / kpi.targetValue) * 100), 100);
                  const isLowProgress = percentage < 40;

                  return (
                    <tr key={kpi.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-6 font-bold text-gray-900">{kpi.district}</td>
                      <td className="py-4 px-6 text-gray-700 font-medium">{kpi.metric}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                          kpi.category === 'Planting' ? 'bg-green-50 text-green-700 border border-green-200' :
                          kpi.category === 'Survival Rate' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                          'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {kpi.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {editingId === kpi.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              value={editTargetValue}
                              onChange={(e) => setEditTargetValue(Number(e.target.value))}
                              className="w-24 p-1 border border-blue-500 rounded text-sm outline-none"
                            />
                            <button onClick={() => handleSaveEdit(kpi.id)} className="p-1 text-green-600 bg-green-50 rounded hover:bg-green-100">
                              <Check className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="font-semibold">{kpi.targetValue.toLocaleString()} {kpi.unit}</span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-full space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">{kpi.currentValue.toLocaleString()} / {kpi.targetValue.toLocaleString()}</span>
                            <span className={`font-semibold ${isLowProgress ? 'text-red-500 flex items-center gap-0.5' : 'text-gray-700'}`}>
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
                        <div className="flex items-center justify-center gap-2">
                          <button 
                            onClick={() => {
                              setEditingId(kpi.id);
                              setEditTargetValue(kpi.targetValue);
                            }}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Target"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteKPI(kpi.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Remove KPI"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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