import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, User, PieChart, ShoppingBag, Settings } from 'lucide-react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { db } from './firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import Dashboard from './components/Dashboard';
import CharacterRoom from './components/CharacterRoom';
import WorkoutSession from './components/WorkoutSession';
import Profile from './components/Profile';
import Shop from './components/Shop';

function App() {
  const [activeTab, setActiveTab] = useState('challenge');
  const [growthPoints, setGrowthPoints] = useState(0);
  const [completedDays, setCompletedDays] = useState([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    mood: 85,
    health: 90,
    energy: 75,
    streak: 0,
    height: 124.5,
    weight: 24.2,
    level: 1,
    exp: 0,
    stretching: 75,
    strength: 60,
    jump: 85,
    rest: 95
  });

  const userId = "sprout-user-default";

  // 1. Firebase Firestore Sync
  useEffect(() => {
    const userDocRef = doc(db, "users", userId);
    
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStats(data.stats);
        setGrowthPoints(data.growthPoints);
        setCompletedDays(data.completedDays);
        setIsPremium(data.isPremium || false);
      } else {
        saveToFirebase(stats, 0, [], false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const saveToFirebase = async (newStats, newPoints, newDays, premiumStatus) => {
    try {
      await setDoc(doc(db, "users", userId), {
        stats: newStats,
        growthPoints: newPoints,
        completedDays: newDays,
        isPremium: premiumStatus !== undefined ? premiumStatus : isPremium,
        lastUpdated: new Date()
      });
    } catch (err) {
      console.error("Firebase Sync Error:", err);
    }
  };

  const handleWorkoutComplete = async (day) => {
    if (!completedDays.includes(day)) {
      const newDays = [...completedDays, day];
      const newPoints = growthPoints + 1;
      
      let newExp = stats.exp + 35;
      let newLevel = stats.level;
      let newHeight = stats.height + 0.1;
      
      if (newExp >= 100) {
        newLevel += 1;
        newExp -= 100;
      }
      
      const newStats = {
        ...stats,
        level: newLevel,
        exp: newExp,
        height: Number(newHeight.toFixed(1)),
        streak: stats.streak + 1,
        stretching: Math.min(100, stats.stretching + 3),
        strength: Math.min(100, stats.strength + 3),
        jump: Math.min(100, stats.jump + 5)
      };

      await saveToFirebase(newStats, newPoints, newDays);
    }
    setActiveTab('challenge');
  };

  const badges = [
    { id: 1, name: 'Early Bird', icon: '🌅' },
    { id: 2, name: 'Consistent', icon: '🔥' },
    { id: 3, name: 'Super Stretcher', icon: '🦒' },
  ];

  const handlePurchase = (item) => {
    if (item.id === 'growth-pass') {
      saveToFirebase(stats, growthPoints, completedDays, true);
    }
  };

  const renderContent = () => {
    if (loading) return null;

    switch (activeTab) {
      case 'challenge':
        return <Dashboard growthPoints={growthPoints} setGrowthPoints={setGrowthPoints} completedDays={completedDays} onDaySelect={(day) => setActiveTab('workout')} />;
      case 'character':
        return <CharacterRoom stats={stats} isPremium={isPremium} onWorkOut={() => setActiveTab('workout')} />;
      case 'workout':
        return <WorkoutSession day={completedDays.length + 1} onComplete={handleWorkoutComplete} onBack={() => setActiveTab('challenge')} />;
      case 'profile':
        return <Profile stats={stats} badges={badges} completedDays={completedDays} />;
      case 'shop':
        return <Shop onPurchase={handlePurchase} isPremium={isPremium} onBack={() => setActiveTab('challenge')} />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-[2rem] bg-primary bubbly-shadow flex items-center justify-center text-white text-3xl font-black"
        >
          S
        </motion.div>
        <p className="text-primary font-headline font-black animate-pulse uppercase tracking-widest">Growing Sprout...</p>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ "client-id": "test" }}>
    <div className="min-h-screen bg-background font-body selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
      {/* TopAppBar */}
      {activeTab !== 'workout' && (
        <header className="bg-background/80 backdrop-blur-xl text-primary sticky top-0 z-50 shadow-[0_20px_40px_rgba(69,35,64,0.06)] flex justify-between items-center px-6 py-4 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden">
              <img src="/mascot_thumb.png" alt="Mascot" className="w-full h-full object-cover" />
            </div>
            <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">Lv.{stats.level} Sprout</h1>
          </div>
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-full border border-primary/10">
            <div className="w-24 h-2 bg-primary/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary" 
                initial={{ width: 0 }}
                animate={{ width: `${stats.exp}%` }}
              />
            </div>
          </div>
        </header>
      )}

      <main className={`max-w-md mx-auto px-6 pb-32 pt-4 ${activeTab === 'workout' ? 'p-0' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* BottomNavBar */}
      {activeTab !== 'workout' && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md flex justify-around items-center px-4 py-3 bg-white/80 backdrop-blur-xl z-50 rounded-t-[3rem] pb-safe shadow-[0_-10px_30px_rgba(69,35,64,0.1)] border-t border-white/50">
          <button
            onClick={() => setActiveTab('challenge')}
            className={`flex flex-col items-center justify-center px-6 py-2 transition-all duration-300 rounded-[2rem] ${
              activeTab === 'challenge' 
              ? 'bg-[#ffcef2] text-primary' 
              : 'text-on-surface/50 hover:bg-surface-variant'
            }`}
          >
            <Trophy className={`w-6 h-6 ${activeTab === 'challenge' ? 'fill-current' : ''}`} />
            <span className="font-medium text-xs mt-1 text-center">Challenge</span>
          </button>

          <button
            onClick={() => setActiveTab('character')}
            className={`flex flex-col items-center justify-center px-6 py-2 transition-all duration-300 rounded-[2rem] ${
              activeTab === 'character' 
              ? 'bg-[#ffcef2] text-primary' 
              : 'text-on-surface/50 hover:bg-surface-variant'
            }`}
          >
            <User className={`w-6 h-6 ${activeTab === 'character' ? 'fill-current' : ''}`} />
            <span className="font-medium text-xs mt-1 text-center">Character</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center justify-center px-6 py-2 transition-all duration-300 rounded-[2rem] ${
              activeTab === 'profile' 
              ? 'bg-[#ffcef2] text-primary' 
              : 'text-on-surface/50 hover:bg-surface-variant'
            }`}
          >
            <PieChart className={`w-6 h-6 ${activeTab === 'profile' ? 'fill-current' : ''}`} />
            <span className="font-medium text-xs mt-1 text-center">Profile</span>
          </button>
        </nav>
      )}

      {/* Floating Action Button */}
      {activeTab === 'challenge' && (
        <button 
          onClick={() => setActiveTab('shop')}
          className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-secondary text-white bubbly-shadow flex items-center justify-center active:scale-90 transition-all z-40"
        >
          <ShoppingBag className="w-8 h-8" />
        </button>
      )}
    </div>
    </PayPalScriptProvider>
  );
}

export default App;
