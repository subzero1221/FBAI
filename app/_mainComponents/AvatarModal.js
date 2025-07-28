import Image from 'next/image';
import { useUserStore } from '../store/userStore';
import { updateMe } from '../actions/userActions';

const avatarImages = [
  '/redyellow.jpg',
  '/worldcup.jpg',
  '/worldcup2018.jpg',
  '/salah.jpg',
  '/griezmann.jpg',
  '/kane.jpg',
  '/messi.jpg',
  '/ozil.jpg',
  '/neymar.jpg',
  '/suarez.jpg',
  '/mancity.jpg',
  '/liverpool.jpg',
  '/barca.jpg',
  '/manutd.jpg',
];

export default function AvatarModal({ isOpen, onClose, currentAvatar }) {
  const userStore = useUserStore();
  const handleSelect = async (avatar) => {
    const res = await updateMe({ avatar });
    if (res.success) {
      userStore.setUserAvatar(avatar);
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mt-96 bg-gradient-to-b from-[#111827]/90 to-[#374151]/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-blue-700 rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-blue-400/30 transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-modalPop" style={{ fontFamily: 'Inter, sans-serif' }}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute cursor-pointer top-4 right-4 bg-blue-600/70 rounded-full p-2.5 text-white hover:bg-blue-500 hover:text-cyan-100 text-2xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex flex-col items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-400 text-2xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">Choose Your Avatar</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {avatarImages.map((img) => (
            <button
              key={img}
              onClick={() => {
                handleSelect(img);
                onClose();
              }}
              className={`rounded-full border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer ${
                currentAvatar === img
                  ? 'border-cyan-400 shadow-lg scale-105'
                  : 'border-blue-500/50 hover:border-cyan-300 hover:scale-110 hover:shadow-md'
              }`}
              style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)' }}
            >
              <Image
                src={img}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
            </button>
          ))}
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
    </div>
  );
}