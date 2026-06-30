"use client"

import React, { useState, useEffect } from 'react';
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
import { districts, districtData, districtProgressData } from '@/data/districts';
import { progressData } from '@/data/charts'

const LineChartComponent = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    const [selectedDistrict, setSelectedDistrict] =
        useState<string>("all");


    const chartData = 
    selectedDistrict !== "all" &&
    districtProgressData[selectedDistrict]
        ? districtProgressData[selectedDistrict]
        : progressData;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
                {selectedDistrict === "all"
                ? "Johor Statewide Progress Timeline"
                : `${selectedDistrict} - Progress Timeline`}
            </h3>
            <div className="w-64">
                <select
                value={selectedDistrict}
                onChange={(e) =>
                    setSelectedDistrict(e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                >
                <option value="all">
                    All Districts (Statewide)
                </option>
                {districts.map((district) => (
                    <option key={district} value={district}>
                    {district}
                    </option>
                ))}
                </select>
            </div>
            </div>
            <div style={{ width: "100%", height: 350 }}>
            {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                    <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis
                    stroke="#6b7280"
                    tickFormatter={(value) =>
                        `${(value / 1000).toFixed(0)}k`
                    }
                    />
                    <Tooltip
                    formatter={(value: any) =>
                        value ? value.toLocaleString() : "N/A"
                    }
                    labelFormatter={(label) =>
                        `Month: ${label}`
                    }
                    />
                    <Legend />
                    <ReferenceLine
                    x="Apr"
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label="Current Date"
                    />
                    <Line
                    key="goal-line"
                    type="monotone"
                    dataKey="goal"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Goal Line"
                    dot={false}
                    />
                    <Line
                    key="actual-line"
                    type="monotone"
                    dataKey="actual"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Actual Planted"
                    connectNulls={false}
                    />
                </LineChart>
                </ResponsiveContainer>
            )}
            </div>
        </div>
    )
}