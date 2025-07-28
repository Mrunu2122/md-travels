import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  date: string;
  earnings: number;
  trips: number;
}

interface EnhancedChartsProps {
  weeklyData: ChartData[];
  monthlyData: ChartData[];
  selectedChart: 'earnings' | 'trips';
  onChartChange: (chart: 'earnings' | 'trips') => void;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {data.earnings !== undefined && (
          <p className="text-sm text-blue-600">₹{data.earnings}</p>
        )}
        {data.trips !== undefined && (
          <p className="text-sm text-green-600">{data.trips} trips</p>
        )}
      </div>
    );
  }
  return null;
};

const EnhancedCharts: React.FC<EnhancedChartsProps> = ({
  weeklyData,
  monthlyData,
  selectedChart,
  onChartChange,
}) => {
  const getMaxValue = (data: ChartData[]) => {
    if (selectedChart === 'earnings') {
      return Math.max(...data.map(d => d.earnings), 1);
    }
    return Math.max(...data.map(d => d.trips), 1);
  };

  const getDataKey = () => selectedChart === 'earnings' ? 'earnings' : 'trips';
  const getColor = () => selectedChart === 'earnings' ? '#3B82F6' : '#10B981';

  return (
    <div className="space-y-6">
      {/* Weekly Earnings Chart */}
      <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Earnings</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onChartChange('earnings')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedChart === 'earnings'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Earnings
            </button>
            <button
              onClick={() => onChartChange('trips')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedChart === 'trips'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trips
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => selectedChart === 'earnings' ? `₹${value}` : value.toString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={getDataKey()} 
              fill={getColor()}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Overview Chart */}
      <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Overview</h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onChartChange('earnings')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedChart === 'earnings'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Earnings
            </button>
            <button
              onClick={() => onChartChange('trips')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                selectedChart === 'trips'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Trips
            </button>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => selectedChart === 'earnings' ? `₹${value}` : value.toString()}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={getDataKey()} 
              fill={selectedChart === 'earnings' ? '#10B981' : '#F59E0B'}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EnhancedCharts; 