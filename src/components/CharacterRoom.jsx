import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Zap, Moon, Activity, Dumbbell, Apple, Smile } from 'lucide-react';

const CharacterRoom = ({ stats, isPremium, onWorkOut }) => {
  const [selectedType, setSelectedType] = useState('jump');

  // Calculate Evolution Stage based on Level
  // Stage 1: Lvl 1-3, Stage 2: Lvl 4-7, Stage 3: Lvl 8-11, Stage 4: Lvl 12+
  const getEvolutionStage = (lvl) => {
    if (lvl <= 3) return 1;
    if (lvl <= 7) return 2;
    if (lvl <= 11) return 3;
    return 4;
  };

  const characterTypes = {
    stretching: { 
      name: 'Stretch Sprout', 
      label: 'Flexibility', 
      accent: '#26a69a', 
      icon: Wind, 
      val: stats.stretching || 75,
      color: 'from-[#e0f7fa] to-[#b2ebf2]' 
    },
    strength: { 
      name: 'Core Sprout', 
      label: 'Stamina', 
      accent: '#fb8c00', 
      icon: Activity, 
      val: stats.strength || 60,
      color: 'from-[#fff3e0] to-[#ffe0b2]' 
    },
    jump: { 
      name: 'Jump Sprout', 
      label: 'Agility', 
      accent: '#1e88e5', 
      icon: Zap, 
      val: stats.jump || 85,
      color: 'from-[#e3f2fd] to-[#bbdefb]' 
    },
    rest: { 
      name: 'Dreamy Sprout', 
      label: 'Recovery', 
      accent: '#8e24aa', 
      icon: Moon, 
      val: stats.rest || 95,
      color: 'from-[#f3e5f5] to-[#e1bee7]' 
    }
  };

  const current = characterTypes[selectedType];
  const stage = getEvolutionStage(stats.level);
  
  // Evolution logic based on type values (Evolved versions for each training type)
  const isEvolved = current.val >= 80;
  const characterImg = isEvolved 
    ? `/floby_${selectedType}_evolved.png` 
    : (stage === 1 ? '/floby_base.png' : `/sprout_stage${stage}.png`);

  return (
    <div className="space-y-6 animate-fade-in flex flex-col min-h-[85vh]">
      {/* 1. 상단 유형 선택 탭 */}
      <div className="flex justify-between bg-white/50 backdrop-blur-md p-1.5 rounded-full border border-white/50 shadow-sm relative z-20">
        {Object.keys(characterTypes).map((key) => {
          const type = characterTypes[key];
          const Icon = type.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedType(key)}
              className={`flex-1 py-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedType === key 
                ? 'bg-white shadow-md scale-105' 
                : 'opacity-40 grayscale hover:opacity-100'
              }`}
            >
              <Icon size={24} style={{ color: selectedType === key ? type.accent : undefined }} />
            </button>
          );
        })}
      </div>

      {/* 2. 메인 캐릭터 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className={`absolute inset-0 bg-gradient-to-b ${current.color} opacity-20 -z-10 rounded-[4rem] transition-colors duration-1000`} />
        
        <motion.div 
          key={`${selectedType}-${stage}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-80 h-80 flex items-center justify-center"
        >
          {/* Premium Aura */}
          {isPremium && (
            <motion.div 
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                    rotate: [0, 180, 360]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-tr from-yellow-300 via-yellow-100 to-orange-300 rounded-full blur-[40px] opacity-40 mix-blend-screen"
            />
          )}

          {/* 캐릭터 단계별 이미지 렌더링 */}
          <motion.img 
            src={characterImg}
            alt={current.name}
            className="w-full h-full object-contain drop-shadow-2xl relative z-10"
            animate={{ 
                y: stage >= 3 ? [0, -30, 0] : [0, -20, 0], // Higher jump for evolved
                scale: stage >= 4 ? [1, 1.05, 1] : [1, 1, 1] // Pulsing for ultimate
            }} 
            transition={{ 
                duration: stage >= 4 ? 4 : 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            src={characterImg} 
            alt="Character" 
            className={`w-full h-full object-contain filter drop-shadow-[0_30px_50px_rgba(0,0,0,0.1)] ${stage >= 4 ? 'brightness-110 contrast-110' : ''}`}
            onError={(e) => { e.target.src = '/floby_base.png' }}
          />
          
          {/* Stage 4 전용 후광 효과 */}
          {stage >= 4 && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-yellow-300/20 to-pink-300/20 rounded-full blur-3xl -z-10"
            />
          )}

          <div className="absolute -bottom-10 w-40 h-8 bg-black/5 blur-3xl rounded-full scale-125" />
        </motion.div>

        {/* 심플한 타이틀 라벨 */}
        <div className="mt-8 text-center bg-white/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/50">
            <h2 className="text-xl font-headline font-black uppercase tracking-tight" style={{ color: current.accent }}>
                Lv.{stats.level} {current.name} {stage >= 4 ? '✨' : ''}
            </h2>
        </div>
      </div>

      {/* 3. 하단 상태 지표 및 액션 버튼 (기능 복구) */}
      <div className="landing-page-actions space-y-6">
        <div className="grid grid-cols-2 gap-4">
            <div className="asymmetric-card bg-white/70 p-5 text-center shadow-sm border border-white/40">
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">{current.label}</p>
                <p className="text-xl font-headline font-black" style={{ color: current.accent }}>{current.val}%</p>
            </div>
            <div className="asymmetric-card bg-white/70 p-5 text-center shadow-sm border border-white/40">
                <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">Total Height</p>
                <p className="text-xl font-headline font-black text-primary">{stats.height}cm</p>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <button 
                onClick={onWorkOut}
                className="w-full squish-active bg-primary text-white py-5 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all"
            >
                <Dumbbell size={24} />
                Training Start
            </button>
            <div className="grid grid-cols-2 gap-3">
                <button className="squish-active bg-white py-4 rounded-full font-headline font-bold text-on-surface shadow-sm border border-surface-variant flex items-center justify-center gap-2">
                    <Apple size={20} className="text-tertiary" /> Feed
                </button>
                <button className="squish-active bg-white py-4 rounded-full font-headline font-bold text-on-surface shadow-sm border border-surface-variant flex items-center justify-center gap-2">
                    <Smile size={20} className="text-secondary" /> Play
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterRoom;
