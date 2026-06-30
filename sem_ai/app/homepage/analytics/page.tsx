'use client'

import '@/app/globals.css'

import { Button } from '@/components/button'

import { useActionState, useRef, useState } from 'react'

import { districtData, districtProgressData } from '@/data/districts'
import { progressData } from '@/data/charts'
import { mbjbPlantingData, PlantingRecord } from '@/data/plantingData'

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


    const [districtList, setDistrictList] = useState<DistrictType[]>([])
    const [districtName, setDistrictName] = useState<string>('')
    const [showPlanting, setShowPlanting] = useState(false)
    const [plantingFilter, setPlantingFilter] = useState<string>('all')

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

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex gap-6">
            
            {/* Map — left side */}
            <div className="w-1/2 shrink-0">
            <JohorDistrictMap onDistrictClick={(p: DistrictType[], name: string) => {
                setDistrictList(p)
                setDistrictName(name)
            }}/>
            </div>

            {/* Table — right side */}
            <div className="w-1/2">
            {districtName !== '' ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-full">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-gray-800">
                            District Performance (Daerah {districtName})
                        </h3>
                        <Button
                            className='bg-white text-black hover:text-white text-xs h-7 px-2'
                            onClick={() => setDistrictName('')}
                        >
                            Back
                        </Button>
                        </div>
                        <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">District</th>
                                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Target</th>
                                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Planted</th>
                                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Status</th>
                                <th className="text-left py-2 px-2 text-xs font-medium text-gray-600">Completion</th>
                            </tr>
                            </thead>
                            <tbody>
                            {districtList.map((district, index) => (
                                <tr
                                key={index}
                                onClick={() => {
                                    setSelectedDistrict(district.district)
                                    setShowPlanting(district.district === 'MBJB (Johor Bahru)')
                                }}
                                className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition ${
                                    selectedDistrict === district.district
                                    ? 'bg-blue-50 border-l-4 border-l-blue-600'
                                    : ''
                                }`}
                                >
                                <td className="py-2 px-2 text-xs font-medium text-gray-800">{district.district}</td>
                                <td className="py-2 px-2 text-xs text-gray-600">{district.target.toLocaleString()}</td>
                                <td className="py-2 px-2 text-xs text-gray-600">{district.planted.toLocaleString()}</td>
                                <td className="py-2 px-2">
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(district.status)}`}>
                                    {district.status === 'on-track' ? 'On Track' : district.status === 'at-risk' ? 'At Risk' : 'Delayed'}
                                    </span>
                                </td>
                                <td className="py-2 px-2 text-xs text-gray-600">{district.completion}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                // Placeholder when no district is selected
                <div className="h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl">
                Click a district on the map to view its data
                </div>
            )}
            </div>

        </div>
        </div>

        {showPlanting && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
                <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                    Planting Records — MBJB (Johor Bahru)
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                    {mbjbPlantingData.length} records · {mbjbPlantingData.reduce((sum, r) => sum + r.amount, 0).toLocaleString()} trees planted
                    </p>
                </div>
                <button
                    onClick={() => setShowPlanting(false)}
                    className="h-8 px-3 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    Close
                </button>
                </div>

                {/* Filter tabs */}
                <div className="flex gap-2 mb-4">
                    {['all', 'developer', 'agency', 'ngo'].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setPlantingFilter(tab)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
                            plantingFilter === tab
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        >
                        {tab === 'all' ? 'All' : tab === 'ngo' ? 'NGO' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    </div>

                    <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">ID</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Agency / Developer</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Type</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Species</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Location</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Amount</th>
                            <th className="text-left py-2 px-3 text-xs font-medium text-gray-600">Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mbjbPlantingData
                            .filter(r => plantingFilter === 'all' || r.type === plantingFilter)
                            .map((record) => (
                            <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="py-2 px-3 text-xs text-gray-400 font-mono">{record.id}</td>
                                <td className="py-2 px-3 text-xs font-medium text-gray-800">{record.agency}</td>
                                <td className="py-2 px-3 text-xs">
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    record.type === 'developer' ? 'bg-blue-100 text-blue-700' :
                                    record.type === 'agency'    ? 'bg-purple-100 text-purple-700' :
                                                                'bg-green-100 text-green-700'
                                }`}>
                                    {record.type === 'ngo' ? 'NGO' : record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                                </span>
                                </td>
                                <td className="py-2 px-3 text-xs text-gray-600">{record.species}</td>
                                <td className="py-2 px-3 text-xs text-gray-600">{record.location}</td>
                                <td className="py-2 px-3 text-xs font-medium text-gray-800">{record.amount.toLocaleString()}</td>
                                <td className="py-2 px-3 text-xs text-gray-500">
                                {new Date(record.date).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                </div>
                )}

      </main>
    </div>
  )
}