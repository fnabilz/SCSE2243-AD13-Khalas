"use client"; 

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import geoData from '@/data/malaysia.district.json'

import { districtData } from "@/data/districts";
import { useRef, useState } from "react";

interface DistrictType {
  district: string,
  target: number,
  planted: number,
  city: string,
  status: string,
  completion: string,
}

interface ChildProps {
  onDistrictClick: (data: DistrictType[], name: string) => void;
}

export default function CustomMap({ onDistrictClick }: ChildProps) {
    const [currentDistrict, setCurrentDistrict] = useState<string>('')
    const [districtList, setDistrictList] = useState<DistrictType[]>([])

    return (
        <div className="overflow-visible w-auto m-auto">
        <ComposableMap
            
            projectionConfig={{
            scale: 17000, 
            center: [103.4, 2.0] 
            }}
        >
            <Geographies geography={geoData}>
            {({ geographies }: { geographies: any[] }) => 
                geographies
                .filter((geo) => geo.properties.state.includes('JHR'))
                .map((geo) => {
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                onClick={() => {
                                    onDistrictClick(districtList, geo.properties.name)
                                }}
                                onMouseEnter={() => {
                                    setCurrentDistrict(geo.id)
                                    setDistrictList(districtData.filter(d => d.city.includes(geo.id)))
                                }}
                                onMouseLeave={() => {
                                    setCurrentDistrict('')
                                    setDistrictList([])
                                }}
                                className="fill-slate-200 stroke-slate-500 stroke-[0.75px] outline-none transition-colors duration-150 ease-in-out hover:fill-emerald-500 hover:stroke-white hover:stroke-[1.2px] hover:cursor-pointer active:fill-emerald-700"
                            />
                        )
                    }
                )
            }
                
            
            </Geographies>
            <Geographies geography={geoData}>
            {({ geographies }: { geographies: any[] }) => 
                geographies
                .filter((geo) => geo.properties.state.includes('JHR'))
                .map((geo) => {
                        return (
                           <Marker coordinates={geoCentroid(geo)}>
                                { currentDistrict === geo.id && 
                                <text
                                    key={geo.id}
                                    textAnchor="middle"
                                    className="fill-slate-900 text-3 font-bold pointer-events-none select-none"
                                >
                                        {geo.properties.name}
                                </text>
                                }
                            </Marker>
                        )
                    }
                )
            }
            </Geographies>
        </ComposableMap>
        </div>
    );
}