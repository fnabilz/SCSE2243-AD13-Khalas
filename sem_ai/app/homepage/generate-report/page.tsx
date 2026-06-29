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
      {/* 1. Expanded the main container width to max-w-[1600px] */}
      <div className="max-w-[1600px] mx-auto h-full flex flex-col lg:flex-row gap-6">

        {/* 2. Left Panel: Changed from lg:w-1/3 to a fixed max width to give the table more room */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
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

        {/* 3. Right Panel: Changed to flex-1 so it dynamically fills all remaining width */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col justify-between min-h-[450px] overflow-hidden">
          {!hasPreview && !isGenerating ? (
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
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 my-auto">
              <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-600">Querying database registers...</p>
              <p className="text-xs text-gray-400 mt-1">Parsing environmental metrics & performance KPIs</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between bg-white p-4 sm:p-8 font-sans rounded-lg">
              
              <div className="text-center mb-6 text-black space-y-1">
                <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase">
                  STATUS PROGRAM MENANAM POKOK OLEH PIHAK BERKUASA TEMPATAN NEGERI JOHOR<br />
                  BAGI SUKU TAHUN PERTAMA 2025
                </h2>
                <p className="text-sm tracking-widest font-medium">
                  ( 1 JANUARI 2025 SEHINGGA 31 MAC 2025 )
                </p>
              </div>

              {/* 4. Removed strict min-w-[800px] and let the browser auto-size the table */}
              <div className="w-full overflow-x-auto shadow-2xl pb-4">
                <table className="w-full border-collapse border border-gray-300 text-sm whitespace-nowrap xl:whitespace-normal">
                  <thead className="bg-white text-black">
                    <tr>
                      <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle w-10">BIL</th>
                      <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle">DAERAH</th>
                      <th className="border border-gray-300 px-3 py-3 font-semibold text-left align-middle">PIHAK BERKUASA TEMPATAN<br />(PBT)</th>
                      
                      {metrics.targetProjections && (
                        <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle">SASARAN<br />TAHUNAN 2025</th>
                      )}
                      {metrics.totalTrees && (
                        <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle">JUMLAH POKOK YANG<br />TELAH DITANAM</th>
                      )}
                      {metrics.agencyPerformance && (
                        <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle">PERATUS %</th>
                      )}
                      {metrics.speciesBreakdown && (
                        <th className="border border-gray-300 px-2 py-3 font-semibold text-center align-middle">SPESIS<br />UTAMA</th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="bg-white text-black">
                    {/* Johor Bahru */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center" rowSpan={3}>1.</td>
                      <td className="border border-gray-300 p-2 uppercase" rowSpan={3}>JOHOR BAHRU</td>
                      <td className="border border-gray-300 p-2 uppercase">MB.JOHOR BAHRU</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">11,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">2,213</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">20.12</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Merawan</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MB. ISKANDAR PUTERI</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">9,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">634</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">7.04</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Bucida</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MB.PASIR GUDANG</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">9,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">1,639</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">18.21</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Tabebuia</td>}
                    </tr>

                    {/* Muar */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">2.</td>
                      <td className="border border-gray-300 p-2 uppercase">MUAR</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.MUAR</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">9,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">0</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">0.00</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">-</td>}
                    </tr>

                    {/* Batu Pahat */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center" rowSpan={2}>3.</td>
                      <td className="border border-gray-300 p-2 uppercase" rowSpan={2}>BATU PAHAT</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.BATU PAHAT</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">9,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">530</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">5.89</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Tecoma</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MD.YONG PENG</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">6,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">181</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">3.02</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Kelat Paya</td>}
                    </tr>

                    {/* Kluang */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center" rowSpan={2}>4.</td>
                      <td className="border border-gray-300 p-2 uppercase" rowSpan={2}>KLUANG</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.KLUANG</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">9,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">262</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">2.91</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Bucida</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MD.SIMPANG RENGGAM</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">3,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">20</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">0.67</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Merawan</td>}
                    </tr>

                    {/* Segamat */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center" rowSpan={2}>5.</td>
                      <td className="border border-gray-300 p-2 uppercase" rowSpan={2}>SEGAMAT</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.SEGAMAT</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">6,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">180</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">3.00</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Tabebuia</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MD.LABIS</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">3,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">15</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">0.50</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Bucida</td>}
                    </tr>

                    {/* Pontian */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">6.</td>
                      <td className="border border-gray-300 p-2 uppercase">PONTIAN</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.PONTIAN</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">3,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">1,100</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">36.67</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Merawan</td>}
                    </tr>

                    {/* Kota Tinggi */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center" rowSpan={2}>7.</td>
                      <td className="border border-gray-300 p-2 uppercase" rowSpan={2}>KOTA TINGGI</td>
                      <td className="border border-gray-300 p-2 uppercase">MD.KOTA TINGGI</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">5,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">0</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">0.00</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">-</td>}
                    </tr>
                    <tr>
                      <td className="border border-gray-300 p-2 uppercase">MP.PENGERANG</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">3,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">110</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">3.67</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Bucida</td>}
                    </tr>

                    {/* Mersing */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">8.</td>
                      <td className="border border-gray-300 p-2 uppercase">MERSING</td>
                      <td className="border border-gray-300 p-2 uppercase">MD.MERSING</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">3,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">650</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">21.67</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Ketapang</td>}
                    </tr>

                    {/* Kulai */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">9.</td>
                      <td className="border border-gray-300 p-2 uppercase">KULAI</td>
                      <td className="border border-gray-300 p-2 uppercase">MP.KULAI</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">6,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">1,018</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">16.97</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Tecoma</td>}
                    </tr>

                    {/* Tangkak */}
                    <tr>
                      <td className="border border-gray-300 p-2 text-center">10.</td>
                      <td className="border border-gray-300 p-2 uppercase">TANGKAK</td>
                      <td className="border border-gray-300 p-2 uppercase">MD.TANGKAK</td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center">6,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center">376</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center">6.27</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center">Bucida</td>}
                    </tr>

                    {/* Total Row */}
                    <tr>
                      <td colSpan={3} className="border border-gray-300 p-2 uppercase text-center font-bold">
                        JUMLAH PENCAPAIAN
                      </td>
                      {metrics.targetProjections && <td className="border border-gray-300 p-2 text-center font-bold text-[#eab308]">100,000</td>}
                      {metrics.totalTrees && <td className="border border-gray-300 p-2 text-center font-bold text-[#22c55e]">8,928</td>}
                      {metrics.agencyPerformance && <td className="border border-gray-300 p-2 text-center font-bold text-[#3b82f6]">8.93%</td>}
                      {metrics.speciesBreakdown && <td className="border border-gray-300 p-2 text-center font-bold">-</td>}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}