import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Droplet, PartyPopper, Lightbulb, Play, Sparkles, Star, Zap } from 'lucide-react';

const WORKOUT_TASKS = {
  1: {
    title: "Morning Sun Stretch",
    description: "Start your day with gentle stretches to help your bones reach for the sky!",
    icon: <Sparkles className="w-12 h-12" />,
    color: "bg-primary-container/20 text-primary",
    accent: "bg-primary-container"
  },
  2: {
    title: "Jumping Bean Challenge",
    description: "Time to get your heart pumping and stimulate those growth plates with jumping!",
    icon: <PartyPopper className="w-12 h-12" />,
    color: "bg-secondary-container/20 text-secondary",
    accent: "bg-secondary-container"
  },
  default: {
    title: "Growth Power Session",
    description: "A balanced mix of stretching and jumping to help you grow taller and stronger!",
    icon: <Leaf className="w-12 h-12" />,
    color: "bg-tertiary/10 text-tertiary",
    accent: "bg-tertiary/20"
  }
};

const Dashboard = ({ growthPoints, completedDays = [], onDaySelect }) => {
  const roadmapDays = Array.from({ length: 14 }, (_, i) => i + 1);
  const currentDay = completedDays.length + 1;
  const todayTask = WORKOUT_TASKS[currentDay] || WORKOUT_TASKS.default;

  return (
    <div className="space-y-10 animate-fade-in pb-32">
      {/* 1. HERO SECTION - Overlapping Layers */}
      <section className="relative pt-8 px-2">
        <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-12 -translate-y-8" 
        />
        
        <div className="asymmetric-card bg-primary text-white p-8 bubbly-shadow relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 bg-white/20 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/20">
              <Star size={14} className="fill-current" />
              <span>Phase 01: Sprouting</span>
            </div>
            <div className="space-y-1">
                <h2 className="text-4xl font-headline font-black leading-none tracking-tight">Growth<br/>Journey</h2>
                <p className="font-bold opacity-70 text-lg">Day {currentDay} of 14</p>
            </div>
            <div className="pt-4 flex items-center gap-3">
                <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-4 border-primary bg-surface-variant flex items-center justify-center text-xs font-black text-primary">
                            {i}
                        </div>
                    ))}
                </div>
                <p className="text-xs font-black uppercase tracking-widest opacity-60">Level Up Soon!</p>
            </div>
          </div>
          <Zap className="absolute -right-6 -bottom-6 w-48 h-48 opacity-10 transform -rotate-12" />
        </div>
      </section>

      {/* 2. TODAY'S TASK - The "I DID IT" Entry */}
      <section className="px-1">
        <div className="asymmetric-card bg-white p-10 bubbly-shadow relative group">
          <div className="absolute top-0 right-0 p-8 text-surface-variant group-hover:text-primary/10 transition-colors duration-500">
            <Sparkles size={80} />
          </div>
          
          <div className="relative z-10 space-y-8">
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <div className={`${todayTask.accent} p-4 rounded-3xl bubbly-shadow`}>
                        {todayTask.icon}
                    </div>
                    <div>
                        <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em]">Today's Mission</p>
                        <h3 className="font-headline text-3xl text-on-surface font-black leading-tight tracking-tight">{todayTask.title}</h3>
                    </div>
                </div>
                <p className="font-body text-on-surface-variant/80 leading-relaxed text-lg font-medium max-w-[90%]">
                    {todayTask.description}
                </p>
            </div>

            <button 
              onClick={() => onDaySelect(currentDay)}
              className="w-full bg-primary text-white py-7 rounded-[2.5rem] font-headline text-3xl font-black bubbly-shadow squish-active flex items-center justify-center gap-4 transition-all hover:scale-[1.02] relative group overflow-hidden"
            >
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Play fill="currentColor" size={32} />
                </motion.div>
                <span className="tracking-tighter">I DID IT!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. ROADMAP - Progress Clouds */}
      <section className="space-y-6 px-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-headline font-black text-on-surface uppercase tracking-tight">Your Progress</h3>
          <div className="bg-white px-4 py-2 rounded-full bubbly-shadow text-xs font-black text-secondary border border-surface-variant/30">
            {completedDays.length}/14 DONE
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {roadmapDays.map((day) => {
            const isCompleted = completedDays.includes(day);
            const isActive = day === currentDay;
            const isUpcoming = day > currentDay;

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isUpcoming && onDaySelect(day)}
                className="relative flex flex-col items-center group"
              >
                <div className={`w-full aspect-square rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${
                  isCompleted 
                  ? 'bg-tertiary text-white bubbly-shadow' 
                  : isActive 
                  ? 'bg-primary border-4 border-white ring-4 ring-primary/20 scale-110 bubbly-shadow' 
                  : 'bg-surface-container-low border-2 border-white opacity-40'
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-7 h-7" />
                  ) : (
                    <span className={`font-headline font-black text-xl ${isActive ? 'text-white' : 'text-on-surface-variant'}`}>{day}</span>
                  )}
                </div>
                {isActive && (
                    <motion.div 
                        layoutId="active-indicator"
                        className="absolute -bottom-2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(167,41,90,0.5)]"
                    />
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* 4. FOOTER TIP - Glassmorphism */}
      <section className="glass rounded-[3rem] p-8 flex items-center gap-6 bubbly-shadow border border-white/50">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-tertiary shadow-sm shrink-0 animate-float">
          <Lightbulb size={32} />
        </div>
        <div className="space-y-1">
          <p className="font-black text-on-surface uppercase tracking-widest text-xs opacity-60">Daily Secret</p>
          <p className="text-base font-bold text-on-surface leading-snug">Drinking water right after exercise helps your body grow faster!</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


