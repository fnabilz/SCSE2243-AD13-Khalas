'use client';

import React, { useState } from 'react';
import { 
  FileBarChart, 
  Loader2, 
  TreePine, 
  TrendingUp, 
  Building2, 
  PieChart,
  Download 
} from 'lucide-react';

// Mock data for the district dropdown
const MOCK_DISTRICTS = [
    'Pontian',
    'Batu Pahat',
    'Johor Bahru',
    'Kluang',
    'Kota Tinggi',
    'Kulai',
    'Mersing',
    'Muar',
    'Segamat',
    'Tangkak'
];

export default function ReportsPage() {
  // Form State
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts (Statewide)');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [metrics, setMetrics] = useState({
    totalTrees: true,
    speciesBreakdown: true,
    targetProjections: false,
    agencyPerformance: false,
  });

  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasPreview, setHasPreview] = useState(false);

  // Toggle handler for checkboxes
  const handleCheckboxChange = (key: keyof typeof metrics) => {
    setMetrics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Mock report generation trigger
  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      setIsGenerating(false);
      setHasPreview(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-full flex flex-col lg:flex-row gap-6">
        
        {/* Parameters Panel */}
        <div className="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
          <div className="flex items-center gap-2 mb-6">
            <FileBarChart className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">
              Report Parameters
            </h3>
          </div>

          <form onSubmit={handleGenerateReport} className="space-y-5">
            {/* District Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select District
              </label>
              <select 
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-800 text-sm"
              >
                <option>All Districts (Statewide)</option>
                {MOCK_DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Date Framework */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm text-gray-800"
                />
              </div>
            </div>

            {/* Metrics Checklist */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Metrics to Include
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={metrics.totalTrees}
                    onChange={() => handleCheckboxChange('totalTrees')}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  Total Trees Planted
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={metrics.speciesBreakdown}
                    onChange={() => handleCheckboxChange('speciesBreakdown')}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  Species Breakdown
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={metrics.targetProjections}
                    onChange={() => handleCheckboxChange('targetProjections')}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  Target Projections
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={metrics.agencyPerformance}
                    onChange={() => handleCheckboxChange('agencyPerformance')}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  Agency Performance
                </label>
              </div>
            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full mt-4 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2 disabled:opacity-70 shadow-sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Compiling Data...
                </>
              ) : (
                "Generate Preview"
              )}
            </button>
          </form>
        </div>

        {/* Dynamic Display Panel (Right Side) */}
        <div className="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between min-h-[450px]">
          {!hasPreview && !isGenerating ? (
            /* Empty State Container */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
              <div className="p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
                <FileBarChart className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-1">No Preview Generated</h4>
              <p className="text-sm text-gray-500 max-w-sm">
                Configure your desired target area, date ranges, and performance variables on the parameters panel to render the report preview.
              </p>
            </div>
          ) : isGenerating ? (
            /* Loading State Display */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-600">Querying database registers...</p>
              <p className="text-xs text-gray-400 mt-1">Parsing environmental metrics & performance KPIs</p>
            </div>
          ) : (
            /* Active Live Data Preview Grid */
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">Live Preview</span>
                    <h4 className="text-xl font-bold text-gray-800 mt-2">{selectedDistrict}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Timeline: {startDate || 'Earliest'} to {endDate || 'Present Day'}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-800 transition shadow-sm self-start sm:self-center">
                    <Download className="w-4 h-4" /> Export PDF
                  </button>
                </div>

                {/* Simulated Metric Cards generated from selection states */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {metrics.totalTrees && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-emerald-500 text-white">
                        <TreePine className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Planted</p>
                        <h5 className="text-2xl font-bold text-gray-800 mt-0.5">14,852</h5>
                      </div>
                    </div>
                  )}

                  {metrics.targetProjections && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-indigo-500 text-white">
                        <TrendingUp className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Target Growth</p>
                        <h5 className="text-2xl font-bold text-gray-800 mt-0.5">+94.2%</h5>
                      </div>
                    </div>
                  )}

                  {metrics.speciesBreakdown && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-amber-500 text-white">
                        <PieChart className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Dominant Species</p>
                        <h5 className="text-md font-bold text-gray-800 mt-1">Oak & Douglas Fir</h5>
                      </div>
                    </div>
                  )}

                  {metrics.agencyPerformance && (
                    <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-blue-500 text-white">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Active Entities</p>
                        <h5 className="text-2xl font-bold text-gray-800 mt-0.5">12 Units</h5>
                      </div>
                    </div>
                  )}
                </div>

                {/* Fallback Message if no metrics checkbox parameters are selected */}
                {!metrics.totalTrees && !metrics.speciesBreakdown && !metrics.targetProjections && !metrics.agencyPerformance && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 text-sm mt-4 text-center">
                    No metrics checkboxes selected. Please choose metrics to populate sample preview assets.
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-400 mt-8 pt-4 border-t border-gray-100 text-right">
                Report generated via internal automated registry pipelines.
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}