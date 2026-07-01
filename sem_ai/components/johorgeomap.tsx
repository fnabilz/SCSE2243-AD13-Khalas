"use client"; 

import { 
    ComposableMap, 
    Geographies, 
    Geography, 
    createCoordinates, 
    Marker, 
    Coordinates, 
    createLongitude, 
    createLatitude, 
    ZoomableGroup, 
    createZoomConfig
} 
from '@vnedyalk0v/react19-simple-maps';
import { ExtendedGeometryCollection, geoCentroid } from "d3-geo";
import geoData from '@/data/malaysia.district.json' 

import { districtData } from "@/data/districts";
import { useState } from "react";
import { GeometryCollection } from 'geojson';

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
    const [clickedDistrict, setClickedDistrict] = useState<string>('')

    function getCoordinates(geo: ExtendedGeometryCollection): Coordinates {
        const coordinates = geoCentroid(geo)
        return [createLongitude(coordinates[0]), createLatitude(coordinates[1])]
    }

    function onMapClick(districtName: string) {
        setClickedDistrict(districtName)
    }

    function renderMap()  {
        return (
            <Geographies geography={geoData}>
                {({ geographies }) => 
                geographies
                    .map((geo) => {  
                        return (<Geography
                            key={geo.id}
                            geography={geo}
                            onClick={() => {
                                onDistrictClick(districtList, geo.properties?.name)
                                onMapClick(geo.id?.toString() ?? '')
                            }}
                            onMouseEnter={() => {
                                setCurrentDistrict(geo.id?.toString() ?? '')
                                setDistrictList(districtData.filter(d => d.city.includes(geo.id?.toString() ?? '')))
                            }}
                            onMouseLeave={() => {
                                setCurrentDistrict('')
                                setDistrictList([])
                            }}
                            className={`stroke-white stroke-[.75px] outline-none transition-colors duration-150 ease-in-out hover:fill-[#F53] hover:stroke-[2px] hover:cursor-pointer ${clickedDistrict === geo.id ? 'fill-[#F53]' : 'fill-slate-400'}`}/>
                        )
                    })
                } 
            </Geographies>
        )
    }

    function renderMarker() {
        return (
            <Geographies geography={geoData}>
            {({ geographies }: { geographies: any[] }) => 
                geographies
                .map((geo) => {
                        return (
                           <Marker key={geo.id} coordinates={getCoordinates(geo)}>
                                { currentDistrict === geo.id && 
                                <text
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
        )
    }

    return (
        <div className="overflow-visible w-auto m-auto">
        <ComposableMap
            width={300}
            height={350}
            projectionConfig={{
                scale: 10000, 
                center: createCoordinates(103.4, 2.0)
            }}>
           {renderMap()}
           {renderMarker()}
        </ComposableMap>
        </div>
    );
}