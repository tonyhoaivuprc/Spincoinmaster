
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { COLORS } from '../constants';

const WelcomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 text-center">
      <div className="mb-8">
        <div className="w-32 h-32 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-xl mx-auto">
          <ShieldCheck size={64} />
        </div>
      </div>
      
      <h1 className="text-3xl font-black text-gray-800 mb-2 tracking-tight">SPIN MASTER</h1>
      <p className="text-gray-600 font-semibold mb-6">Reward Link Spins</p>
      
      <div className="text-xs text-gray-400 leading-relaxed mb-12 max-w-xs">
        Bằng cách tiếp tục, bạn đồng ý với Chính sách Bảo mật,<br />
        Điều khoản Sử dụng và Chính sách Riêng tư của chúng tôi.
      </div>

      <button
        onClick={() => navigate('/home')}
        className="w-full py-4 rounded-xl bg-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
      >
        <span className="opacity-80">→</span> CHẤP NHẬN
      </button>
    </div>
  );
};

export default WelcomeScreen;
