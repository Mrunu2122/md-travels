import React, { useState, useEffect } from 'react';
import { apiService, Profile as ProfileType } from '../services/api';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    car_model: '',
    rating: 5,
    driver_id: 'dad',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const profileData = await apiService.getProfile();
      setProfile(profileData);
      setFormData({
        name: profileData.name,
        car_model: profileData.car_model,
        rating: profileData.rating,
        driver_id: 'dad',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Set default profile if none exists
      setProfile({
        driver_id: 'dad',
        name: 'Amit Sharma',
        car_model: 'Maruti Suzuki Dzire',
        rating: 5,
      });
      setFormData({
        name: 'Amit Sharma',
        car_model: 'Maruti Suzuki Dzire',
        rating: 5,
        driver_id: 'dad',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const updatedProfile = await apiService.updateProfile(formData);
      setProfile(updatedProfile);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      {/* Header with glassmorphic effect */}
      <div className="backdrop-blur-md bg-white/70 shadow-lg px-4 py-6 border-b border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Driver information and settings</p>
      </div>

      <div className="px-4 py-6">
        {/* Profile Card */}
        <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-6 border border-white/20">
          {/* Profile Picture Placeholder */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
              {profile?.name ? (
                <span className="text-4xl font-bold text-gray-400">
                  {profile.name.charAt(0).toUpperCase()}
                </span>
              ) : (
                <span className="text-4xl font-bold text-gray-400">A</span>
              )}
            </div>
          </div>

          {/* Driver Information */}
          <div className="text-center space-y-4">
            {editing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Car Model</label>
                  <input
                    type="text"
                    value={formData.car_model}
                    onChange={(e) => setFormData({ ...formData, car_model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleUpdateProfile}
                    disabled={loading}
                    className="flex-1 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{profile?.name}</h2>
                </div>
                <div>
                  <p className="text-gray-600">{profile?.car_model}</p>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-yellow-400 text-xl mr-2">⭐</span>
                  <span className="text-lg font-semibold text-gray-900">{profile?.rating}</span>
                </div>
                <button
                  onClick={() => setEditing(true)}
                  className="w-full bg-gray-100 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>

        {/* Additional Profile Options */}
        <div className="mt-6 space-y-4">
          <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Settings</h3>
            <div className="space-y-2">
              <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-50 transition-colors">
                <span className="mr-2">🔧</span>
                Settings
              </button>
              <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-50 transition-colors">
                <span className="mr-2">📊</span>
                Statistics
              </button>
              <button className="w-full text-left py-2 px-3 rounded hover:bg-gray-50 transition-colors">
                <span className="mr-2">📱</span>
                Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 