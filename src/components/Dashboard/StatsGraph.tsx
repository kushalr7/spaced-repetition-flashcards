import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from 'recharts';

interface DataPoint {
  date: string;
  correct: number;
  incorrect: number;
}

interface StatsGraphProps {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-800">{`${label}`}</p>
        <div className="mt-2 space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <div 
                className="w-3 h-3 rounded-full mr-2" 
                style={{ backgroundColor: entry.color }} 
              />
              <span className="text-gray-700">
                {entry.name === "correct" ? "Correct" : "Incorrect"}: 
              </span>
              <span className="ml-1 font-medium">
                {entry.value} ({total > 0 ? Math.round((entry.value / total) * 100) : 0}%)
              </span>
            </div>
          ))}
          <div className="pt-1 mt-1 border-t border-gray-200">
            <span className="text-gray-700">Total: </span>
            <span className="font-medium">{total}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const StatsGraph: React.FC<StatsGraphProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p>No review data available yet</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        barGap={0}
        barSize={28}
      >
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#f3f4f6"
        />
        <XAxis 
          dataKey="date" 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          dy={8}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          dx={-10}
        />
        <Tooltip 
          content={<CustomTooltip />}
          cursor={{ fill: 'rgba(236, 253, 245, 0.4)' }}
        />
        <Legend 
          formatter={(value) => (
            <span className="text-sm font-medium text-gray-700">
              {value === "correct" ? "Correct Answers" : "Incorrect Answers"}
            </span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 16 }}
        />
        <Bar 
          dataKey="correct" 
          stackId="a" 
          fill="#0ea5e9" 
          name="correct"
          radius={[4, 4, 0, 0]}
        />
        <Bar 
          dataKey="incorrect" 
          stackId="a" 
          fill="#8b5cf6" 
          name="incorrect" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatsGraph;