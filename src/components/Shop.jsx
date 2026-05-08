import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Sparkles, Check, ArrowRight, ShieldCheck, Zap, PartyPopper } from 'lucide-react'
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function Shop({ onPurchase, isPremium, onBack }) {
  const [success, setSuccess] = useState(false)

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      setSuccess(true)
      if (onPurchase) onPurchase({ id: 'growth-pass', details })
    })
  }

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-tertiary-container rounded-full flex items-center justify-center text-white bubbly-shadow">
          <PartyPopper size={48} />
        </div>
        <h2 className="text-4xl font-headline font-black text-primary">Payment Successful!</h2>
        <p className="text-xl font-bold text-on-surface-variant">Premium Pass Unlocked.</p>
        <button 
          onClick={onBack}
          className="bg-primary text-white py-4 px-12 rounded-full font-headline font-bold text-xl squish-active shadow-lg"
        >
          START CHALLENGE
        </button>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      <div className="relative asymmetric-card bg-gradient-to-br from-secondary to-[#a7295a] p-8 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-10 opacity-20 transform translate-x-12 -translate-y-12"><Crown size={150} /></div>
        
        <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-white/30">
                <Sparkles size={14} className="animate-pulse" />
                Limited Offer
            </div>
            <h2 className="text-4xl font-headline font-black tracking-tight leading-none mb-4">14-Day Growth<br/>Premium Pass</h2>
            <div className="flex items-baseline gap-2 mb-8">
                <span className="text-6xl font-headline font-black tracking-tighter">$14.99</span>
                <span className="text-xl opacity-60 font-bold line-through">$24.99</span>
            </div>
            
            <ul className="space-y-4 mb-10">
                <Benefit label="Unlock all 14 Growth Missions" />
                <Benefit label="Exclusive Gold Abyss Skin" />
                <Benefit label="Detailed Growth Analysis Report" />
                <Benefit label="No more Ads (Safe for Kids)" />
                <Benefit label="Weekly Progress Consultation" />
            </ul>

            <div className="mt-8 space-y-4">
                {isPremium ? (
                    <div className="bg-white/20 backdrop-blur-md rounded-[40px] p-8 text-center border-2 border-white/50">
                        <Check size={48} className="mx-auto mb-4" />
                        <p className="font-headline font-black text-2xl uppercase tracking-tighter">Premium Active</p>
                        <p className="text-xs font-bold opacity-70">You already have the full growth pass!</p>
                    </div>
                ) : (
                    <>
                        <p className="text-xs font-bold uppercase tracking-widest text-center opacity-80 mb-2">Checkout with PayPal</p>
                        <div className="rounded-[40px] overflow-hidden bg-white shadow-xl">
                            <PayPalButtons 
                                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                description: "14-Day Growth Premium Pass",
                                                amount: {
                                                    currency_code: "USD",
                                                    value: "14.99",
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={handleApprove}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ItemCard icon="🍄" label="Mega Growth Berry" price="$0.99" />
        <ItemCard icon="🎮" label="Magic Toy Box" price="$2.49" />
      </div>

      <div className="flex items-center justify-center gap-4 text-on-surface/50 font-bold text-[10px] uppercase tracking-widest border-t border-surface-variant pt-6">
        <ShieldCheck size={16} />
        Secure Kid-Safe Payment by PayPal
      </div>
    </div>
  )
}

function Benefit({ label }) {
    return (
        <li className="flex items-center gap-3">
            <div className="bg-white/20 p-1.5 rounded-full"><Check size={14} /></div>
            <span className="font-bold text-sm">{label}</span>
        </li>
    )
}

function ItemCard({ icon, label, price }) {
    return (
        <div className="asymmetric-card p-6 bg-white bubbly-shadow border-2 border-transparent hover:border-secondary transition-all">
            <div className="text-4xl mb-3">{icon}</div>
            <div className="font-headline font-black text-secondary leading-tight mb-2 uppercase text-xs tracking-tight">{label}</div>
            <div className="text-primary font-black">{price}</div>
        </div>
    )
}
