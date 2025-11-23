import React from 'react';

interface ResultCardProps {
  title: string;
  value: string;
  subValue?: string;
  highlight?: boolean;
  negative?: boolean;
  icon?: React.ReactNode;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, value, subValue, highlight, negative, icon }) => {
  return (
    <div className={`relative overflow-hidden rounded-xl p-5 border transition-all duration-300 ${
      highlight 
        ? negative 
          ? 'bg-red-50 border-red-200 shadow-md' 
          : 'bg-emerald-50 border-emerald-200 shadow-md'
        : 'bg-white border-slate-100 shadow-sm'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${
            highlight 
              ? negative ? 'text-red-600' : 'text-emerald-600' 
              : 'text-slate-500'
          }`}>
            {title}
          </p>
          <h3 className={`text-2xl font-bold ${
            highlight 
              ? negative ? 'text-red-700' : 'text-emerald-700' 
              : 'text-slate-900'
          }`}>
            {value}
          </h3>
          {subValue && (
            <p className="text-xs text-slate-500 mt-1 font-medium">
              {subValue}
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-2 rounded-lg ${
             highlight 
              ? negative ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600' 
              : 'bg-slate-100 text-slate-600'
          }`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;