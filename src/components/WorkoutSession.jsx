import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Play, Timer, Trophy, CheckCircle2, Star, Video, Sparkles, Medal, Heart } from 'lucide-react'

// Daily Workout Data
const WORKOUT_CONTENT = {
  1: {
    title: "Morning Sun Stretch",
    description: "Start your day with gentle stretches to help your bones reach for the sky!",
    videoUrl: "https://www.youtube.com/embed/02E1468SdHg", 
    duration: "10 MINS",
    difficulty: "Easy",
    tags: ["Stretching", "Energy", "Morning"]
  },
  2: {
    title: "Jumping Bean Challenge",
    description: "Time to get your heart pumping and stimulate those growth plates with jumping!",
    videoUrl: "https://www.youtube.com/embed/501BqDXL63M",
    duration: "15 MINS",
    difficulty: "Medium",
    tags: ["Jumping", "Cardio", "Fun"]
  },
  default: {
    title: "Growth Power Session",
    description: "A balanced mix of stretching and jumping to help you grow taller and stronger!",
    videoUrl: "https://www.youtube.com/embed/Td6zFtZPkJ4",
    duration: "12 MINS",
    difficulty: "Medium",
    tags: ["Growth", "Power", "Full Body"]
  }
}

export default function WorkoutSession({ day, onComplete, onBack }) {
  const [step, setStep] = useState(0) // 0: intro, 1: exercise (video), 2: complete
  const workout = WORKOUT_CONTENT[day] || WORKOUT_CONTENT.default

  const startExercise = () => setStep(1)
  const finishExercise = () => setStep(2)

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6 p-6 pb-24"
          >
            <div className="flex items-center justify-between">
                <button 
                  onClick={onBack}
                  className="bg-white p-4 rounded-2xl bubbly-shadow text-primary active:scale-90 transition-transform"
                >
                  <ArrowLeft size={24} />
                </button>
                <div className="bg-primary/10 px-4 py-2 rounded-full">
                    <span className="text-primary font-black text-sm uppercase tracking-widest">Day {day}</span>
                </div>
            </div>
            
            <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden bubbly-shadow bg-surface-variant group">
                <img 
                  src={`https://img.youtube.com/vi/${workout.videoUrl.split('/').pop()}/maxresdefault.jpg`} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  alt="Workout Thumbnail"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8">
                    <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startExercise}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl mb-6"
                    >
                        <Play fill="currentColor" size={32} className="ml-1" />
                    </motion.button>
                    <h2 className="text-4xl font-headline font-black text-white leading-none tracking-tight mb-2">{workout.title}</h2>
                    <p className="text-white/80 font-bold">{workout.duration} • {workout.difficulty}</p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="asymmetric-card bg-white/60 p-8 border border-white/50 space-y-4">
                    <div className="flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest">
                        <Sparkles size={16} />
                        <span>Growth Stimulation</span>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed font-medium text-lg">
                        {workout.description}
                    </p>
                </div>
                
                <button 
                  onClick={startExercise}
                  className="w-full bg-primary text-white py-6 rounded-full font-headline text-2xl font-black bubbly-shadow active:scale-[0.96] transition-all"
                >
                  LET'S START!
                </button>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div 
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col"
          >
            <div className="flex-1 relative bg-black">
              <iframe 
                width="100%" 
                height="100%" 
                src={`${workout.videoUrl}?autoplay=1&controls=1&modestbranding=1&rel=0`}
                title={workout.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              
              <button 
                onClick={() => setStep(0)}
                className="absolute top-6 left-6 bg-black/40 backdrop-blur-md p-3 rounded-2xl text-white"
              >
                <ArrowLeft size={24} />
              </button>
            </div>
            
            <div className="bg-white p-8 pb-12 rounded-t-[3.5rem] bubbly-shadow space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-black text-2xl text-on-surface tracking-tight">{workout.title}</h3>
                    <div className="flex items-center gap-2 text-tertiary font-bold text-sm">
                      <Heart size={16} fill="currentColor" />
                      <span>You're doing great!</span>
                    </div>
                  </div>
                  <div className="bg-primary/10 text-primary p-4 rounded-3xl">
                    <Video size={32} />
                  </div>
                </div>
                
                <button 
                  onClick={finishExercise}
                  className="w-full bg-tertiary text-white py-6 rounded-full font-headline text-2xl font-black bubbly-shadow active:scale-[0.96] transition-all"
                >
                    MISSION COMPLETE!
                </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-8 overflow-hidden"
          >
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[150%] aspect-square bg-gradient-to-tr from-primary/10 via-secondary/10 to-tertiary/10 rounded-full blur-[100px] -z-10"
            />

            <div className="relative w-full max-w-sm space-y-12 text-center">
                <div className="relative">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                        className="w-48 h-48 bg-white rounded-[3rem] shadow-2xl flex items-center justify-center mx-auto relative z-10"
                    >
                        <Trophy size={100} className="text-yellow-500 animate-bounce" />
                    </motion.div>
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-yellow-400/20 rounded-full blur-3xl"
                    />
                </div>

                <div className="space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h2 className="text-5xl font-headline font-black text-on-surface tracking-tighter">WOO-HOO!</h2>
                        <p className="text-on-surface-variant font-bold uppercase tracking-[0.3em] text-sm">Workout Certified</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <RewardCard label="Exp" value="+35" color="text-tertiary" bg="bg-tertiary/10" />
                        <RewardCard label="Growth" value="+0.1cm" color="text-primary" bg="bg-primary/10" />
                    </div>
                </div>

                <motion.button 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => onComplete(day)}
                    className="w-full bg-primary text-white py-6 rounded-full font-headline text-2xl font-black bubbly-shadow active:scale-[0.96] transition-all"
                >
                    CLAIM REWARDS
                </motion.button>
            </div>

            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{ 
                        y: [-20, 20, -20],
                        x: [-10, 10, -10],
                        opacity: [0.3, 0.7, 0.3]
                    }}
                    transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                    className="absolute text-yellow-400"
                    style={{ 
                        top: `${20 + i * 15}%`, 
                        left: `${10 + (i % 3) * 35}%` 
                    }}
                >
                    <Star size={24} fill="currentColor" />
                </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function RewardCard({ label, value, color, bg }) {
    return (
        <div className={`${bg} rounded-[2.5rem] p-6 bubbly-shadow border border-white/40`}>
            <div className={`${color} font-black text-3xl tracking-tighter`}>{value}</div>
            <div className={`${color} opacity-60 font-black text-[10px] uppercase tracking-widest mt-1`}>{label}</div>
        </div>
    )
}


