"use client"

import React, { useState, useEffect } from 'react';
import {
    BarChart,
    Bar, 
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, 
    ResponsiveContainer
} from 'recharts';
import { districtData } from '@/data/districts';

const BarChartComponent: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true); }, []);

    const data = districtData.map((d) => ({
        name: d.district,
        planted: d.planted,
        target: d.target
    }))

    return (
        <div className="rounded 2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                District Planted vd Target
            </h3>
            <div style={{ width: "100%", height: 350 }}>
                {isMounted && (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="e5e7eb" />
                            <XAxis 
                                dataKey="name"
                                stroke="#6b7280"
                                tick={{ fontSize: 11}}
                                angle={-35}
                                textAnchor="end"
                            />
                            <YAxis 
                                stroke="#6b7280"
                                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip formatter={(v: any) => v.toLocaleString()} />
                            <Bar dataKey="target" fill="#e2e8f0" name="Target" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="planted" fill="#10b981" name="Planted" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
};

export default BarChartComponent;