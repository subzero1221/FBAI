import Link from 'next/link';

export default function LoginSignupModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md animate-fadeIn">
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full relative shadow-xl border border-white/20 text-center animate-modalPop" style={{ fontFamily: 'Inter, sans-serif' }}>
        <button 
          onClick={onClose} 
          aria-label="Close" 
          className="absolute cursor-pointer top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2.5 text-white/70 hover:text-white text-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 text-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
            </svg>
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Join to Predict</h2>
        </div>
        <p className="mb-8 text-gray-300 text-sm leading-relaxed">Sign in or create an account to unlock predictions and personalized insights.</p>
        <div className="flex flex-col gap-4">
        <Link 
  href="/login" 
  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-blue-600 text-white font-medium shadow-lg hover:bg-blue-700 hover:text-blue-200 hover:scale-[1.02] transition-all duration-300 ease-out group"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-5 h-5 group-hover:stroke-blue-200"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M18 12l-6-6m0 0l-6 6m6-6v12" 
    />
  </svg>
  <span className="text-white group-hover:text-blue-200">Sign In</span>
</Link>
<Link 
  href="/register" 
  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-500 text-white font-medium shadow-lg hover:bg-green-600 hover:text-green-200 hover:scale-[1.02] transition-all duration-300 ease-out group"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={2} 
    stroke="currentColor" 
    className="w-5 h-5 group-hover:stroke-green-200"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 4.5v15m7.5-7.5h-15" 
    />
  </svg>
  <span className="text-white group-hover:text-green-200">Sign Up</span>
</Link>
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes modalPop {
          0% { transform: scale(0.9) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-modalPop {
          animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
}