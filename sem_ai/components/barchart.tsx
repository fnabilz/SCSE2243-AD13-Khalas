import React from 'react';
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

type ChartData = {
    name: string;
    value: number;
};

const data: ChartData[] = [
    { name: 'Page A', value: 400 },
    { name: 'Page B', value: 200 },
    { name: 'Page C', value: 500 },
    { name: 'Page D', value: 129 },
    { name: 'Page E', value: 322 },
];

const BarChartComponent: React.FC = () => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartComponent;