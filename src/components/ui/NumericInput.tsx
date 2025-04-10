import React, { useState, useEffect } from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface NumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onValueChange?: (value: number | null) => void;
  required?: boolean;
  value?: string;
  min?: number;
  max?: number;
}

export function NumericInput({
  label,
  error,
  className,
  onValueChange,
  required = false,
  value: initialValue = '',
  min,
  max,
  ...props
}: NumericInputProps) {
  const [value, setValue] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Update internal value when prop changes
  useEffect(() => {
    // Only update if the value coming in is different from what the user has typed
    // and the field is not currently focused
    if (initialValue !== undefined && initialValue !== value && !document.activeElement?.contains(document.getElementById('numeric-input'))) {
      setValue(initialValue);
    }
  }, [initialValue, value]);

  // Validate value against min/max constraints
  const validateValue = (val: string) => {
    if (val === '') {
      return required ? 'This field is required' : null;
    }

    const numValue = parseFloat(val);
    
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    if (min !== undefined && numValue < min) {
      return `Value must be at least ${min}`;
    }
    
    if (max !== undefined && numValue > max) {
      return `Value must not exceed ${max}`;
    }
    
    return null;
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Allow empty string or valid numbers (including decimal points)
    if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
      setValue(newValue);
      
      // Convert to number or null for the parent component
      // Empty string or invalid numbers should be null
      let numericValue = null;
      if (newValue !== '' && !isNaN(parseFloat(newValue))) {
        numericValue = parseFloat(newValue);
      }
      
      // Always update parent to ensure sync
      onValueChange?.(numericValue);
      
      // Validate if already touched
      if (isTouched) {
        setValidationError(validateValue(newValue));
      }
    }
  };

  // Handle blur event - validate on blur
  const handleBlur = () => {
    setIsTouched(true);
    setValidationError(validateValue(value));
  };

  // Handle focus event
  const handleFocus = () => {
    setIsTouched(true);
  };

  // Determine error to display (prop error takes precedence)
  const displayError = error || validationError;
  const showError = isTouched && displayError;

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input
        id="numeric-input"
        type="text"
        inputMode="decimal"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={cn(
          className,
          showError && "border-red-500 focus:ring-red-500"
        )}
        {...props}
      />
      {showError && (
        <p className="text-xs text-red-500 mt-1">
          {displayError}
        </p>
      )}
    </div>
  );
} 