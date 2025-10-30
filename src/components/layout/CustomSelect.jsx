// src/components/CustomSelect.jsx
import { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

export default function CustomSelect({ options, value, onChange, placeholder = 'Select...' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.id === value) || null;

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="input p-3 w-full flex items-center justify-between text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
      >
        <span className={selectedOption ? 'text-[var(--color-text)]' : 'text-[var(--color-secondary-400)]'}>
          {selectedOption?.name || placeholder}
        </span>
        <FiChevronDown
          className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''} text-[var(--color-secondary-500)]`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[var(--color-card)] rounded-lg shadow-lg border border-[var(--color-border)] max-h-60 overflow-auto">
          {options.map(option => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 transition-colors ${
                value === option.id
                  ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)]'
                  : 'hover:bg-[var(--color-secondary-50)] text-[var(--color-text)]'
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}