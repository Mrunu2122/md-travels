import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import AddTrip from './pages/AddTrip';
import Expenses from './pages/Expenses';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';

type Page = 'dashboard' | 'add-trip' | 'expenses' | 'profile';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-trip':
        return <AddTrip />;
      case 'expenses':
        return <Expenses />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderPage()}
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
