"use client"

import { 
  ArrowRight, 
  LogOut, 
  Plus,
  TrendingUp,
  ArrowUpRight,
  FileBarChart,
  BarChart3,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Button } from '@/components/button'
import '@/app/globals.css'
import { useState, useEffect } from 'react'
import { progressData } from '@/data/charts'
import { districts, districtData, districtProgressData } from '@/data/districts'
import BarChartComponent from '@/components/barchart';
import LineChartComponent from '@/components/linechart';


export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const [activeView, setActiveView] = useState<
    "dashboard" | "reports" | "targets" | "export"
  >("dashboard");

  // For chart mock data
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>("all");

  const selectedDistrictData =
    selectedDistrict !== "all"
      ? districtData.find(
          (d) => d.district === selectedDistrict,
        )
      : null;

    const chartData =
    selectedDistrict !== "all" &&
    districtProgressData[selectedDistrict]
      ? districtProgressData[selectedDistrict]
      : progressData;

    const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "bg-green-100 text-green-800";
      case "at-risk":
        return "bg-yellow-100 text-yellow-800";
      case "delayed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  console.log("chartData:", chartData);
  console.log("progressData:", progressData);

  return (

    <div className='flex flex-col min-h-screen w-full'>
      
      {/* Dashboard Main Workspace */}
      <main className="flex-1 p-8 space-y-8 w-full bg-slate-50 ">

        {/* Welcome / Action Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back! Here is the overview of the campaign's progress.</p>
          </div>
        </div>

        {/* 3. METRIC CARDS ROW */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Total Planted (Statewide)</span>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900">698,000</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Current Progress %</span>
              <span className="flex items-center gap-0.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" /> +4.3%
              </span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900">69.8%</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">Avg District Target</span>
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900">66.8%</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">AI Predictive Completion</span>
              <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">-2.4%</span>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-zinc-900">Oct 16</span>
            </div>
          </div>
        </div>

        {/* Burn-up Chart */}
        <LineChartComponent />

          {/* District Performance Table + Gemini Insight */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7">
              <BarChartComponent />
            </div>

            {/* Gemini Insight Card */}
            <div className="lg:col-span-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800">
                  Gemini Insights
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    🎯 Key Observation
                  </p>
                  <p className="text-sm text-gray-600">
                    MDKS (Kluang) is significantly behind
                    target at 28.6% completion. Immediate
                    intervention recommended.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    ⚠️ Bottleneck Alert
                  </p>
                  <p className="text-sm text-gray-600">
                    MDS (Segamat) showing slower pace in Q2.
                    Weather delays and staffing gaps
                    identified.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    ✅ Positive Trend
                  </p>
                  <p className="text-sm text-gray-600">
                    MBJB and MPM maintaining excellent pace.
                    Consider resource reallocation to
                    struggling districts.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    📊 State Forecast
                  </p>
                  <p className="text-sm text-gray-600">
                    At current pace, state target achievable
                    by Oct 14, 2026. 94% confidence level.
                  </p>
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  )
}