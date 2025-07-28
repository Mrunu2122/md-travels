import React, { useState } from 'react';
import { apiService } from '../services/api';
import CustomNumberInput from '../components/CustomNumberInput';
import toast, { Toaster } from 'react-hot-toast';

interface PlatformData {
  trips: number;
  earnings: number;
}

const AddTrip: React.FC = () => {
  const [tripDate, setTripDate] = useState(new Date().toISOString().split('T')[0]);
  const [totalTrips, setTotalTrips] = useState(0);
  const [workingHours, setWorkingHours] = useState('');
  const [platforms, setPlatforms] = useState<Record<string, PlatformData>>({
    ola: { trips: 0, earnings: 0 },
    uber: { trips: 0, earnings: 0 },
    rapido: { trips: 0, earnings: 0 },
  });
  const [loading, setLoading] = useState(false);

  const updatePlatform = (platform: string, field: keyof PlatformData, value: number) => {
    setPlatforms(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: value
      }
    }));
  };

  const calculateGrossEarnings = () => {
    return Object.values(platforms).reduce((total, platform) => total + platform.earnings, 0);
  };

  const calculateTotalTrips = () => {
    return Object.values(platforms).reduce((total, platform) => total + platform.trips, 0);
  };

  const handleAddTrip = async () => {
    if (!workingHours) {
      toast.error('Please enter working hours');
      return;
    }

    if (calculateTotalTrips() === 0) {
      toast.error('Please enter at least one trip');
      return;
    }

    if (calculateGrossEarnings() === 0) {
      toast.error('Please enter earnings for at least one platform');
      return;
    }

    const notification = toast.loading('Adding trip...');

    try {
      setLoading(true);
      
      const tripData = {
        trip_date: tripDate,
        total_trips: calculateTotalTrips(),
        working_hours: workingHours,
        earnings_ola: platforms.ola.earnings,
        earnings_uber: platforms.uber.earnings,
        earnings_rapido: platforms.rapido.earnings,
        gross_earnings: calculateGrossEarnings(),
      };

      await apiService.addTrip(tripData);
      
      toast.success('Trip added successfully!', { id: notification });
      
      // Reset form
      setTotalTrips(0);
      setWorkingHours('');
      setPlatforms({
        ola: { trips: 0, earnings: 0 },
        uber: { trips: 0, earnings: 0 },
        rapido: { trips: 0, earnings: 0 },
      });
    } catch (error) {
      console.error('Error adding trip:', error);
      toast.error('Failed to add trip. Please try again.', { id: notification });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <Toaster position="top-center" />
      
      {/* Header with glassmorphic effect */}
      <div className="backdrop-blur-md bg-white/70 shadow-lg px-4 py-6 border-b border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Trip</h1>
        <p className="text-gray-600">Track your daily earnings and trips</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* General Trip Details */}
        <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Date</label>
              <input
                type="date"
                value={tripDate}
                onChange={(e) => setTripDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
              <input
                type="text"
                placeholder="e.g., 12h"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>

        {/* Platform Earnings */}
        <div className="space-y-4">
          {/* Ola */}
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🚗</span>
              <h3 className="text-lg font-semibold text-gray-900">Ola</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trips</label>
                <CustomNumberInput
                  value={platforms.ola.trips}
                  onChange={(value) => updatePlatform('ola', 'trips', value)}
                  placeholder="0"
                  min={0}
                  max={999}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Earnings (₹)</label>
                <CustomNumberInput
                  value={platforms.ola.earnings}
                  onChange={(value) => updatePlatform('ola', 'earnings', value)}
                  placeholder="0"
                  min={0}
                  max={999999}
                />
              </div>
            </div>
          </div>

          {/* Uber */}
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🚗</span>
              <h3 className="text-lg font-semibold text-gray-900">Uber</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trips</label>
                <CustomNumberInput
                  value={platforms.uber.trips}
                  onChange={(value) => updatePlatform('uber', 'trips', value)}
                  placeholder="0"
                  min={0}
                  max={999}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Earnings (₹)</label>
                <CustomNumberInput
                  value={platforms.uber.earnings}
                  onChange={(value) => updatePlatform('uber', 'earnings', value)}
                  placeholder="0"
                  min={0}
                  max={999999}
                />
              </div>
            </div>
          </div>

          {/* Rapido */}
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🛵</span>
              <h3 className="text-lg font-semibold text-gray-900">Rapido</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trips</label>
                <CustomNumberInput
                  value={platforms.rapido.trips}
                  onChange={(value) => updatePlatform('rapido', 'trips', value)}
                  placeholder="0"
                  min={0}
                  max={999}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Earnings (₹)</label>
                <CustomNumberInput
                  value={platforms.rapido.earnings}
                  onChange={(value) => updatePlatform('rapido', 'earnings', value)}
                  placeholder="0"
                  min={0}
                  max={999999}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="backdrop-blur-md bg-blue-50/80 rounded-xl p-4 border border-blue-200/50">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">📊</span>
              <h3 className="text-lg font-semibold text-gray-900">Total Trips</h3>
            </div>
            <div className="text-2xl font-bold text-blue-600">{calculateTotalTrips()}</div>
          </div>

          <div className="backdrop-blur-md bg-green-50/80 rounded-xl p-4 border border-green-200/50">
            <div className="flex items-center mb-2">
              <span className="text-xl mr-2">💰</span>
              <h3 className="text-lg font-semibold text-gray-900">Gross Earnings</h3>
            </div>
            <div className="text-2xl font-bold text-green-600">₹{calculateGrossEarnings()}</div>
          </div>
        </div>

        {/* Add Trip Button */}
        <button
          onClick={handleAddTrip}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Adding Trip...
            </>
          ) : (
            <>
              <span className="mr-2">✨✨</span>
              Add Trip
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTrip; 