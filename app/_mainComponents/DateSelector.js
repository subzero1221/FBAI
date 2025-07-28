'use client';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DateSelector = ({ current, setCurrent }) => {
  const today = dayjs();
  
  const handleChange = (direction) => {
    const newDate = current.add(direction, 'day');
    
    const isTooEarly = newDate.isBefore(today.subtract(7, 'day'));
    const isTooLate = newDate.isAfter(today.add(7, 'day'));
    
    if (!isTooEarly && !isTooLate) {
      setCurrent(newDate);
    }
  };

  const isToday = current.isSame(today, 'day');
  const isYesterday = current.isSame(today.subtract(1, 'day'), 'day');
  const isTomorrow = current.isSame(today.add(1, 'day'), 'day');
  
  const getDateLabel = () => {
    if (isToday) return 'Today';
    if (isYesterday) return 'Yesterday';
    if (isTomorrow) return 'Tomorrow';
    return current.format('ddd');
  };

  return (
    <div className="flex items-center justify-center gap-3 mt-24 mb-4 ">
      {/* Left Arrow */}
      <button
        onClick={() => handleChange(-1)}
        disabled={current.isSameOrBefore(today.subtract(7, 'day'))}
        className="group cursor-pointer relative w-10 h-10 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/40 hover:border-blue-400/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:scale-105 disabled:hover:scale-100"
      >
        <span className="text-slate-300 group-hover:text-blue-300 group-disabled:text-slate-500 transition-colors text-lg font-bold">
          ←
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/5 transition-all duration-200"></div>
      </button>

      {/* Date Display */}
      <div className="relative group">
        <div className={`
          px-6 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 min-w-[140px] text-center
          ${isToday 
            ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/80 border-blue-400/50 shadow-lg shadow-blue-500/20' 
            : 'bg-gradient-to-r from-slate-800/80 to-slate-700/80 border-slate-600/40 hover:border-slate-500/60'
          }
        `}>
          <div className={`
            text-xs font-bold tracking-wider uppercase mb-0.5 transition-colors
            ${isToday ? 'text-blue-100' : 'text-slate-400'}
          `}>
            {getDateLabel()}
          </div>
          <div className={`
            text-lg font-bold transition-colors
            ${isToday ? 'text-white' : 'text-slate-200'}
          `}>
            {current.format('D MMM')}
          </div>
          
          {/* Animated underline for today */}
          {isToday && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
          )}
        </div>

        {/* Glow effect for today */}
        {isToday && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 -z-10 blur-xl animate-pulse"></div>
        )}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => handleChange(1)}
        disabled={current.isSameOrAfter(today.add(7, 'day'))}
        className="group cursor-pointer relative w-10 h-10 rounded-xl bg-gradient-to-r from-slate-800/80 to-slate-700/80 border border-slate-600/40 hover:border-blue-400/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center backdrop-blur-sm hover:scale-105 disabled:hover:scale-100"
      >
        <span className="text-slate-300 group-hover:text-blue-300 group-disabled:text-slate-500 transition-colors text-lg font-bold">
          →
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/5 transition-all duration-200"></div>
      </button>
    </div>
  );
};

export default DateSelector;