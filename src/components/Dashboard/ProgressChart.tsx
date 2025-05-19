import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip,
  Sector
} from 'recharts';

interface ProgressChartProps {
  total: number;
  mastered: number;
  learning: number;
  due: number;
}

// Enhanced color scheme
const COLORS = ['#14b8a6', '#7c3aed', '#f59e0b'];
const RADIAN = Math.PI / 180;

// Active sector styling
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, value, percent
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.8}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 8}
        outerRadius={outerRadius + 10}
        fill={fill}
        opacity={0.6}
      />
      <text 
        x={cx} 
        y={cy - 8} 
        dy={8} 
        textAnchor="middle" 
        fill={fill}
        className="font-medium"
      >
        {payload.name}
      </text>
      <text 
        x={cx} 
        y={cy + 8} 
        dy={8} 
        textAnchor="middle" 
        fill="#374151"
        className="font-bold text-lg"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <div className="flex items-center">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: data.payload.fill }} 
          />
          <span className="text-sm font-medium text-gray-800">{data.name}</span>
        </div>
        <div className="mt-1.5">
          <span className="text-sm text-gray-700">{data.value} cards</span>
          <span className="text-sm text-gray-500 ml-2">({(data.payload.percent * 100).toFixed(1)}%)</span>
        </div>
      </div>
    );
  }
  return null;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  total, 
  mastered, 
  learning, 
  due 
}) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const onPieEnter = (data: any, index: number) => setActiveIndex(index);

  // If there are no cards, show empty state
  if (total === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
        <p>No flashcards available</p>
      </div>
    );
  }

  const data = [
    { name: 'Mastered', value: mastered, fill: COLORS[0] },
    { name: 'Learning', value: learning, fill: COLORS[1] },
    { name: 'Due for Review', value: due, fill: COLORS[2] }
  ].filter(item => item.value > 0); // Only include non-zero segments
  
  // Custom label that shows percentage
  const renderCustomizedLabel = ({ 
    cx, 
    cy, 
    midAngle, 
    innerRadius, 
    outerRadius, 
    percent, 
    index 
  }: { 
    cx: number; 
    cy: number; 
    midAngle: number; 
    innerRadius: number; 
    outerRadius: number; 
    percent: number; 
    index: number; 
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          {data.map((entry, index) => (
            <linearGradient 
              key={`gradient-${index}`} 
              id={`gradient-${index}`} 
              x1="0" y1="0" x2="0" y2="1"
            >
              <stop 
                offset="0%" 
                stopColor={entry.fill} 
                stopOpacity={1} 
              />
              <stop 
                offset="100%" 
                stopColor={entry.fill} 
                stopOpacity={0.7} 
              />
            </linearGradient>
          ))}
        </defs>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          paddingAngle={2}
          strokeWidth={2}
          stroke="rgba(255,255,255,0.7)"
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={`url(#gradient-${index})`} 
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          formatter={(value) => (
            <span className="text-sm font-medium text-gray-700">{value}</span>
          )}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ paddingTop: 16 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;