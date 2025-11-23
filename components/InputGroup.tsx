import React from 'react';
import { Info } from 'lucide-react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (val: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
  tooltip?: string;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
  tooltip
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1.5">
        <label className="text-sm font-medium text-slate-700 block">
          {label}
        </label>
        {tooltip && (
          <div className="group relative flex justify-center">
             <Info className="w-4 h-4 text-slate-400 cursor-help" />
             <span className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg z-10">
               {tooltip}
             </span>
          </div>
        )}
      </div>
      <div className="relative rounded-md shadow-sm">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm font-semibold">{prefix}</span>
          </div>
        )}
        <input
          type="number"
          value={value.toString()} // Use string to avoid leading zero issues during typing
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          className={`block w-full rounded-md border-slate-300 py-2.5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors bg-white border ${
            prefix ? 'pl-10' : 'pl-3'
          } ${suffix ? 'pr-10' : 'pr-3'}`}
        />
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="text-slate-500 sm:text-sm font-semibold">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputGroup;