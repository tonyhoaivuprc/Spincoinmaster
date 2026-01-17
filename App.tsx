
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import RewardListScreen from './screens/RewardListScreen';
import { RewardType } from './types';

const App: React.FC = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-white relative overflow-hidden flex flex-col shadow-2xl">
      <Router>
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route 
            path="/spins" 
            element={<RewardListScreen type={RewardType.SPIN} title="Spin Links" />} 
          />
          <Route 
            path="/coins" 
            element={<RewardListScreen type={RewardType.COIN} title="Coin Links" />} 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
