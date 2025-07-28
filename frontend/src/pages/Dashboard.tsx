import React, { useState, useEffect } from 'react';
import { apiService, Trip, Expense } from '../services/api';
import EnhancedCharts from '../components/EnhancedCharts';

interface DashboardData {
  totalTrips: number;
  workingHours: number;
  grossEarnings: number;
  expenses: number;
  netEarnings: number;
}

interface ChartData {
  date: string;
  earnings: number;
  trips: number;
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalTrips: 0,
    workingHours: 0,
    grossEarnings: 0,
    expenses: 0,
    netEarnings: 0,
  });
  const [weeklyData, setWeeklyData] = useState<ChartData[]>([]);
  const [monthlyData, setMonthlyData] = useState<ChartData[]>([]);
  const [selectedChart, setSelectedChart] = useState<'earnings' | 'trips'>('earnings');
  const [loading, setLoading] = useState(true);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [trips, expenses] = await Promise.all([
        apiService.getTrips(),
        apiService.getExpenses()
      ]);

      // Calculate today's data
      const today = new Date().toISOString().split('T')[0];
      const todayTrips = trips.filter(trip => trip.trip_date === today);
      const todayExpenses = expenses.filter(expense => expense.expense_date === today);

      // Calculate totals
      const totalTrips = todayTrips.reduce((sum, trip) => sum + trip.total_trips, 0);
      const workingHours = todayTrips.reduce((sum, trip) => {
        const hours = parseInt(trip.working_hours.replace('h', '')) || 0;
        return sum + hours;
      }, 0);
      const grossEarnings = todayTrips.reduce((sum, trip) => sum + trip.gross_earnings, 0);
      const totalExpenses = todayExpenses.reduce((sum, expense) => sum + expense.fuel + expense.other, 0);
      const netEarnings = grossEarnings - totalExpenses;

      setDashboardData({
        totalTrips,
        workingHours,
        grossEarnings,
        expenses: totalExpenses,
        netEarnings,
      });

      // Prepare weekly data (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const weeklyDataPoints = last7Days.map(date => {
        const dayTrips = trips.filter(trip => trip.trip_date === date);
        const dayExpenses = expenses.filter(expense => expense.expense_date === date);
        
        const dayEarnings = dayTrips.reduce((sum, trip) => sum + trip.gross_earnings, 0);
        const dayTripsCount = dayTrips.reduce((sum, trip) => sum + trip.total_trips, 0);

        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          earnings: dayEarnings,
          trips: dayTripsCount,
        };
      });

      setWeeklyData(weeklyDataPoints);

      // Prepare monthly data (last 30 days)
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const monthlyDataPoints = last30Days.map(date => {
        const dayTrips = trips.filter(trip => trip.trip_date === date);
        const dayExpenses = expenses.filter(expense => expense.expense_date === date);
        
        const dayEarnings = dayTrips.reduce((sum, trip) => sum + trip.gross_earnings, 0);
        const dayTripsCount = dayTrips.reduce((sum, trip) => sum + trip.total_trips, 0);

        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          earnings: dayEarnings,
          trips: dayTripsCount,
        };
      });

      setMonthlyData(monthlyDataPoints);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default empty data if API fails
      setWeeklyData([]);
      setMonthlyData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppShare = () => {
    const message = `🚗 MD Tours & Travels - Daily Summary

📊 Today's Performance:
• Total Trips: ${dashboardData.totalTrips}
• Working Hours: ${dashboardData.workingHours}h
• Gross Earnings: ₹${dashboardData.grossEarnings}
• Total Expenses: ₹${dashboardData.expenses}
• Net Earnings: ₹${dashboardData.netEarnings}

✅ Great day!
#MDTours #DriverLife #EarningsTracker`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header with glassmorphic effect */}
      <div className="backdrop-blur-md bg-white/70 shadow-lg px-4 py-6 border-b border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MD Tours & Travels</h1>
        <div className="flex items-center text-gray-600">
          <span className="mr-2">📅</span>
          <span>{currentDate}</span>
        </div>
      </div>

      {/* Metrics Cards with glassmorphic effect */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="text-2xl font-bold text-blue-600">{dashboardData.totalTrips}</div>
            <div className="text-sm text-gray-600">Total Trips</div>
          </div>
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-600">{dashboardData.workingHours}h</div>
            <div className="text-sm text-gray-600">Working Hours</div>
          </div>
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="text-2xl font-bold text-green-600">₹{dashboardData.grossEarnings}</div>
            <div className="text-sm text-gray-600">Gross Earnings</div>
          </div>
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="text-2xl font-bold text-red-600">₹{dashboardData.expenses}</div>
            <div className="text-sm text-gray-600">Expenses</div>
          </div>
        </div>
        <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 mb-6 border border-white/20">
          <div className="text-2xl font-bold text-blue-600">₹{dashboardData.netEarnings}</div>
          <div className="text-sm text-gray-600">Net Earnings</div>
        </div>
      </div>

      {/* Enhanced Charts */}
      <div className="px-4">
        <EnhancedCharts
          weeklyData={weeklyData}
          monthlyData={monthlyData}
          selectedChart={selectedChart}
          onChartChange={setSelectedChart}
        />
      </div>

      {/* WhatsApp FAB with glassmorphic effect */}
      <button
        onClick={handleWhatsAppShare}
        className="fixed bottom-20 right-4 w-14 h-14 backdrop-blur-md bg-green-500/90 rounded-full shadow-lg flex items-center justify-center text-white text-2xl hover:bg-green-600/90 transition-all duration-200 border border-white/20"
        title="Share on WhatsApp"
      >
        💬
      </button>
    </div>
  );
};

export default Dashboard; 