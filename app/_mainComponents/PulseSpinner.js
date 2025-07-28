export default function PulseSpinner({ size = 'lg', text = 'Loading...', className = '' })  {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12', 
      lg: 'w-16 h-16',
      xl: 'w-20 h-20'
    };
  
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen bg-#111827 ${className}`}>
        {/* Pulse rings */}
        <div className="relative flex items-center justify-center">
          <div className={`${sizeClasses[size]} border-4 border-blue-500/30 rounded-full animate-ping`}></div>
          <div className={`absolute ${sizeClasses[size]} border-4 border-blue-500/50 rounded-full animate-ping`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`absolute ${sizeClasses[size]} border-4 border-blue-500 rounded-full animate-ping`} style={{ animationDelay: '0.4s' }}></div>
          
          {/* Center dot */}
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        </div>
  
        {/* Loading text */}
        {text && (
          <p className="text-white text-lg font-medium mt-6">{text}</p>
        )}
      </div>
    );
  };