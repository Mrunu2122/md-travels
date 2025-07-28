import React from 'react';

type Page = 'dashboard' | 'add-trip' | 'expenses' | 'profile';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'dashboard' as Page, label: 'Home', icon: '🏠' },
    { id: 'add-trip' as Page, label: 'Add Trip', icon: '➕' },
    { id: 'expenses' as Page, label: 'Expenses', icon: '💵' },
    { id: 'profile' as Page, label: 'Profile', icon: '👤' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/80 border-t border-white/20 px-4 py-2">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
              currentPage === item.id
                ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <span className="text-xl mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 