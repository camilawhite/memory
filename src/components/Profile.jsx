import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Ruler, TrendingUp, Wind, Zap, Moon, Activity } from 'lucide-react';

const Profile = ({ stats, completedDays, badges }) => {
  const growthCategories = [
    { name: 'Flexibility (Stretching)', val: stats.flexibility || 75, icon: Wind, color: '#26a69a' },
    { name: 'Stamina (Core)', val: stats.stamina || 60, icon: Activity, color: '#fb8c00' },
    { name: 'Agility (Jump)', val: stats.agility || 85, icon: Zap, color: '#1e88e5' },
    { name: 'Recovery (Rest)', val: stats.recovery || 95, icon: Moon, color: '#8e24aa' }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      {/* Header Profile Card */}
      <section className="asymmetric-card bg-white p-8 bubbly-shadow space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-surface-variant flex items-center justify-center overflow-hidden border-4 border-white shadow-lg shrink-0">
            <img src="/mascot_thumb.png" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-headline font-black text-on-surface">Sprout Runner</h2>
            <div className="flex items-center gap-2">
              <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Lvl {stats.level}</span>
              <span className="text-xs font-bold text-on-surface/50">{completedDays.length} Days Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <StatMini label="Current Height" value={`${stats.height}cm`} icon={Ruler} />
          <StatMini label="Training Streak" value={`${stats.streak} Days`} icon={TrendingUp} />
        </div>
      </section>

      {/* Floby Growth Analysis Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
          <span>Floby Growth Analysis</span>
          <div className="h-px flex-1 bg-surface-variant ml-2 opacity-50"></div>
        </h3>
        
        <div className="asymmetric-card bg-white p-6 bubbly-shadow space-y-6">
          {growthCategories.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <cat.icon size={16} style={{ color: cat.color }} />
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{cat.name}</span>
                </div>
                <span className="text-sm font-black" style={{ color: cat.color }}>{cat.val}%</span>
              </div>
              <div className="h-2.5 w-full bg-surface-variant/40 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.val}%` }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
          <span>Awarded Badges</span>
          <div className="h-px flex-1 bg-surface-variant ml-2 opacity-50"></div>
        </h3>
        
        <div className="grid grid-cols-3 gap-4 pb-4">
          {badges.map((badge) => (
            <motion.div 
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-[2rem] bubbly-shadow text-center border-2 border-transparent hover:border-secondary transition-all"
            >
              <div className="text-4xl filter drop-shadow-md mb-1">{badge.icon}</div>
              <span className="text-[10px] font-black uppercase text-on-surface tracking-tight leading-tight">{badge.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const StatMini = ({ label, value, icon: Icon }) => (
  <div className="bg-surface-variant/30 px-5 py-4 rounded-[2rem] border border-surface-variant/50 space-y-1">
    <div className="flex items-center gap-2 text-on-surface/40">
      <Icon size={14} />
      <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className="text-lg font-headline font-black text-on-surface">{value}</p>
  </div>
);

export default Profile;
