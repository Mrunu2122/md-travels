import React, { useState } from 'react';
import { apiService } from '../services/api';
import CustomNumberInput from '../components/CustomNumberInput';
import toast, { Toaster } from 'react-hot-toast';

const Expenses: React.FC = () => {
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [fuelExpenses, setFuelExpenses] = useState(0);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSaveExpenses = async () => {
    if (fuelExpenses === 0 && otherExpenses === 0) {
      toast.error('Please enter at least one expense amount');
      return;
    }

    const notification = toast.loading('Saving expenses...');

    try {
      setLoading(true);
      
      const expenseData = {
        expense_date: expenseDate,
        fuel: fuelExpenses,
        other: otherExpenses,
      };

      await apiService.addExpense(expenseData);
      
      toast.success('Expenses saved successfully!', { id: notification });
      
      // Reset form
      setFuelExpenses(0);
      setOtherExpenses(0);
    } catch (error) {
      console.error('Error saving expenses:', error);
      toast.error('Failed to save expenses. Please try again.', { id: notification });
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = fuelExpenses + otherExpenses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-20">
      <Toaster position="top-center" />
      
      {/* Header with glassmorphic effect */}
      <div className="backdrop-blur-md bg-white/70 shadow-lg px-4 py-6 border-b border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Expenses</h1>
        <p className="text-gray-600">Track your daily expenses</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Expense Input Section */}
        <div className="backdrop-blur-md bg-white/80 rounded-xl shadow-lg p-4 border border-white/20">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expense Date</label>
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fuel Expenses (Petrol/CNG)
              </label>
              <CustomNumberInput
                value={fuelExpenses}
                onChange={setFuelExpenses}
                placeholder="0"
                min={0}
                max={999999}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Expenses (Toll, Food, Parking)
              </label>
              <CustomNumberInput
                value={otherExpenses}
                onChange={setOtherExpenses}
                placeholder="0"
                min={0}
                max={999999}
              />
            </div>
          </div>
        </div>

        {/* Total Expenses Display */}
        <div className="backdrop-blur-md bg-red-50/80 rounded-xl p-4 border border-red-200/50">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">Total Expenses:</span>
            <span className="text-2xl font-bold text-red-600">₹{totalExpenses}</span>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveExpenses}
          disabled={loading}
          className="w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Saving Expenses...
            </>
          ) : (
            <>
              <span className="mr-2">💰</span>
              Save Expenses
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Expenses; 