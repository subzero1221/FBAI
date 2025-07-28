import Link from 'next/link';

export default function NoTokensModal({ isOpen, onClose }) {
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
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400 text-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Out of Tokens</h2>
        </div>
        <p className="mb-8 text-gray-300 text-sm leading-relaxed">You don’t have enough tokens to get AI predictions. Please buy more tokens to continue using this feature.</p>
        <Link 
          href="/pricing" 
          className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:from-pink-600 hover:to-red-600 hover:scale-105 transition-all duration-300"
        >
         <p className='text-white'>Buy Tokens</p> 
        </Link>
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
    </div>
  );
} 