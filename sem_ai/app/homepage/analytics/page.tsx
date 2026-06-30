'use client'

import '@/app/globals.css'

import { Button } from '@/components/button'

import { useActionState, useRef, useState } from 'react'

import { districts, districtData, districtProgressData } from '@/data/districts'
import { progressData } from '@/data/charts'

import JohorDistrictMap from '@/components/johorgeomap'

interface DistrictType {
  district: string,
  target: number,
  planted: number,
  city: string,
  status: string,
  completion: string,
}


export default function AnalyticsPage() {
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");

    const selectedDistrictData = selectedDistrict !== "all" ? districtData.find((d) => d.district === selectedDistrict) : null;
    const chartData = selectedDistrict !== "all" && districtProgressData[selectedDistrict] ? districtProgressData[selectedDistrict] : progressData;

    const [districtList, setDistrictList] = useState<DistrictType[]>([])
    const [districtName, setDistrictName] = useState<string>('')

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

    return (
    <div className='flex flex-col min-h-screen w-full'>
        
      
      {/* Dashboard Main Workspace */}
      <main className="flex-1 p-8 space-y-8 w-full bg-slate-50 ">

        {/* Welcome / Action Banner Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Analytics</h1>
          </div>
        </div>

        {districtName === '' && 
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <JohorDistrictMap onDistrictClick={(p: DistrictType[], name: string) => {
                    setDistrictList(p)
                    setDistrictName(name)
                }}/>
            </div>
        }

        {districtName !== '' &&
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                        District Performance & Projections (Daerah {districtName})
                    </h3>
                    <Button className='bg-gray-600 text-black hover:text-white'
                        onClick={() => {
                            setDistrictName('')
                        }}>
                        Back
                    </Button>
                </div>
                <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        District
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Annual Target
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Trees Planted
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                        Est. Completion
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {districtList.map((district, index) => (
                        <tr
                        key={index}
                        onClick={() =>
                            setSelectedDistrict(
                            district.district,
                            )
                        }
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                            selectedDistrict ===
                            district.district
                            ? "bg-blue-50 border-l-4 border-l-blue-600"
                            : ""
                        }`}
                        >
                        <td className="py-3 px-4 font-medium text-gray-800">
                            {district.district}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                            {district.target.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                            {district.planted.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                            <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(district.status)}`}
                            >
                            {district.status === "on-track"
                                ? "On Track"
                                : district.status ===
                                    "at-risk"
                                ? "At Risk"
                                : "Delayed"}
                            </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                            {district.completion}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        }

      </main>
    </div>
  )
}