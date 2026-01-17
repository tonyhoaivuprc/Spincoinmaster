
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/AppBar';
import { 
  Coins, 
  Dices, 
  BookOpen, 
  MessageCircleQuestion, 
  Lightbulb, 
  Star, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';
import { COLORS } from '../constants';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AppBar title="SPIN MASTER" />
      <div className="text-center bg-[#7B1FA2] pb-4 -mt-1 shadow-inner">
        <p className="text-white text-xs opacity-80">Reward Link Spins</p>
      </div>
      
      <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar space-y-4">
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/coins')}
            style={{ backgroundColor: COLORS.secondary }}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg text-white active:scale-95 transition-transform"
          >
            <Coins size={48} className="mb-3" />
            <span className="font-bold text-lg">Coin Links</span>
          </button>
          
          <button 
            onClick={() => navigate('/spins')}
            style={{ backgroundColor: COLORS.primary }}
            className="aspect-square rounded-2xl flex flex-col items-center justify-center p-4 shadow-lg text-white active:scale-95 transition-transform"
          >
            <Dices size={48} className="mb-3" />
            <span className="font-bold text-lg">Spin Links</span>
          </button>
        </div>

        {/* CM Guide */}
        <button 
          style={{ backgroundColor: COLORS.success }}
          className="w-full py-4 rounded-xl flex items-center justify-center gap-3 text-white font-bold text-lg shadow-md active:scale-95 transition-transform"
        >
          <BookOpen size={24} />
          <span>CM Guide</span>
        </button>

        {/* FAQs and Tip Row */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            style={{ backgroundColor: COLORS.info }}
            className="py-3 rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-md active:scale-95 transition-transform"
          >
            <MessageCircleQuestion size={20} />
            <span>FAQs</span>
          </button>
          <button 
            style={{ backgroundColor: COLORS.info }}
            className="py-3 rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-md active:scale-95 transition-transform"
          >
            <Lightbulb size={20} />
            <span>Tip</span>
          </button>
        </div>

        {/* Bottom Utility Row */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            style={{ backgroundColor: COLORS.info }}
            className="py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <Star size={18} />
            <span>Rate</span>
          </button>
          <button 
            style={{ backgroundColor: COLORS.info }}
            className="py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
          <button 
            style={{ backgroundColor: COLORS.info }}
            className="py-3 rounded-xl flex flex-col items-center justify-center gap-1 text-white text-xs font-bold shadow-md active:scale-95 transition-transform"
          >
            <ShieldCheck size={18} />
            <span>Privacy Policy</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
