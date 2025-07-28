import axios from 'axios';

// API base URL - supports both development and production
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types for API responses - matching backend models exactly
export interface Trip {
  _id?: string;
  date?: string; // Optional for backend response
  trip_date: string;
  total_trips: number;
  working_hours: string;
  earnings_ola: number;
  earnings_uber: number;
  earnings_rapido: number;
  gross_earnings: number;
}

export interface Expense {
  _id?: string;
  date?: string; // Optional for backend response
  expense_date: string;
  fuel: number;
  other: number;
}

export interface Profile {
  _id?: string;
  name: string;
  car_model: string;
  rating: number;
}

// API functions
export const apiService = {
  // Trips
  async addTrip(trip: Omit<Trip, '_id' | 'date'>): Promise<Trip> {
    const response = await api.post('/trips', trip);
    return response.data;
  },

  async getTrips(): Promise<Trip[]> {
    const response = await api.get('/trips');
    return response.data;
  },

  // Expenses
  async addExpense(expense: Omit<Expense, '_id' | 'date'>): Promise<Expense> {
    const response = await api.post('/expenses', expense);
    return response.data;
  },

  async getExpenses(): Promise<Expense[]> {
    const response = await api.get('/expenses');
    return response.data;
  },

  // Profile
  async getProfile(): Promise<Profile> {
    const response = await api.get('/profile');
    return response.data;
  },

  async updateProfile(profile: Omit<Profile, '_id'>): Promise<Profile> {
    const response = await api.post('/profile', profile);
    return response.data;
  },

  // Health check
  async healthCheck(): Promise<any> {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api; 