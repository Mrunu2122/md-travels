import React, { useRef, useEffect, useState } from 'react';

interface CustomNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  value,
  onChange,
  placeholder = "0",
  min = 0,
  max = 999999,
  step = 1,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(value === 0 ? '' : value.toString());

  // Update display value when prop value changes
  useEffect(() => {
    setDisplayValue(value === 0 ? '' : value.toString());
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow empty string for better UX
    if (inputValue === '') {
      setDisplayValue('');
      onChange(0);
      return;
    }
    
    // Remove leading zeros except for single zero
    let cleanValue = inputValue;
    if (inputValue.length > 1 && inputValue.startsWith('0')) {
      cleanValue = inputValue.replace(/^0+/, '');
      if (cleanValue === '') {
        cleanValue = '0';
      }
    }
    
    // Only allow digits
    if (!/^\d+$/.test(cleanValue)) {
      return;
    }
    
    const intValue = parseInt(cleanValue);
    if (isNaN(intValue)) return;
    
    // Prevent negative values
    if (intValue < min) return;
    
    // Prevent values above max
    if (intValue > max) return;
    
    // Update display value (without leading zeros)
    setDisplayValue(intValue === 0 ? '' : intValue.toString());
    onChange(intValue);
  };

  const handleIncrement = () => {
    const newValue = value + step;
    if (newValue <= max) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = value - step;
    if (newValue >= min) {
      onChange(newValue);
    }
  };

  const handleFocus = () => {
    // Select all text when focused for easy editing
    if (inputRef.current) {
      inputRef.current.select();
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="absolute left-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm">−</span>
      </button>
      
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm text-center"
      />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="absolute right-2 z-10 flex h-6 w-6 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-sm">+</span>
      </button>
    </div>
  );
};

export default CustomNumberInput; 