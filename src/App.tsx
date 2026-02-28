/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Smartphone, 
  Zap, 
  Droplets, 
  BatteryLow, 
  Cpu, 
  ArrowRight, 
  MessageSquare, 
  DollarSign,
  Camera,
  CheckCircle2,
  XCircle,
  ShieldCheck
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

// Initialize Gemini for a fun "Price Estimator"
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-height-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20 ${className}`}>
    {children}
  </section>
);

export default function App() {
  const [estimate, setEstimate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneDescription, setPhoneDescription] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneDescription) return;
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Estimate a fair cash value for this broken phone in Indian Rupees (INR). 
        Description: ${phoneDescription}. 
        Be realistic but encouraging. Format as a short, punchy response with a price range.`,
        config: {
          systemInstruction: "You are a professional phone buyer. You give quick, fair estimates for broken devices. Use a friendly, business-like tone. Keep it under 50 words.",
        }
      });
      setEstimate(response.text || "Contact us for a custom quote!");
    } catch (error) {
      console.error(error);
      setEstimate("Oops! Our estimator is busy. DM us for a quote!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2">
          <Smartphone className="text-emerald-500" />
          CASH<span className="text-emerald-500">PHONE</span>
        </div>
        <button className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
          GET CASH NOW
        </button>
      </nav>

      {/* 00-03s Hook: The Shattered Screen */}
      <Section className="h-screen">
        <motion.div 
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center"
        >
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-4">
            Kya Aapka Phone <br />
            <span className="text-red-500 line-through decoration-white/20">Toot Chuka Hai?</span>
          </h1>
          <motion.div
            animate={{ rotate: [0, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 0.2, repeatDelay: 3 }}
            className="inline-block bg-red-600 text-white px-8 py-2 text-2xl font-black uppercase skew-x-[-10deg] mb-8"
          >
            FENKO MAT! ❌
          </motion.div>
        </motion.div>
        
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-[20px] border-white/5 rounded-[3rem] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595941069915-4ebc5197c14a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
        </div>
      </Section>

      {/* 03-07s Transition: Snap -> Cash */}
      <Section className="bg-emerald-500 text-black h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-8xl mb-4"
          >
            🤌✨
          </motion.div>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4">
            Ise Kachra Nahi, <br />
            <span className="bg-black text-emerald-500 px-4">COLD CASH</span> Samjho!
          </h2>
          <p className="text-xl font-bold opacity-80">Snap your fingers, get your money.</p>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, x: Math.random() * 1000 - 500, opacity: 0 }}
              whileInView={{ 
                y: 1000, 
                opacity: [0, 1, 1, 0],
                rotate: Math.random() * 360 
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="absolute text-6xl"
            >
              💸
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 07-12s The Pitch: Rapid Cuts */}
      <Section className="bg-zinc-900">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Droplets className="w-12 h-12 text-blue-400" />, title: "WATER DAMAGE", desc: "Paani mein gira? No problem!" },
              { icon: <Smartphone className="w-12 h-12 text-red-400" />, title: "BROKEN SCREEN", desc: "Shattered glass? We buy it!" },
              { icon: <BatteryLow className="w-12 h-12 text-yellow-400" />, title: "DEAD BATTERY", desc: "Switch off forever? Cash it!" },
              { icon: <Cpu className="w-12 h-12 text-emerald-400" />, title: "MOTHERBOARD", desc: "Internal issues? Sab chalega!" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-black p-8 border border-white/10 rounded-3xl hover:border-emerald-500/50 transition-colors group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                <h3 className="text-2xl font-black mb-2">{item.title}</h3>
                <p className="text-zinc-400 font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              DEAD? BROKEN? <span className="text-emerald-500">SAB CHALEGA! ✅</span>
            </h2>
          </div>
        </div>
      </Section>

      {/* 12-17s The Action: Process */}
      <Section className="bg-white text-black">
        <div className="max-w-4xl w-full">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12 text-center">
            Ghar Baithe <span className="text-emerald-600">Best Price</span> Pao
          </h2>
          
          <div className="space-y-8">
            {[
              { step: "01", title: "Details Bhejo", desc: "WhatsApp or DM your phone details and photos." },
              { step: "02", title: "Price Lock Karo", desc: "Get an instant fair quote from our team." },
              { step: "03", title: "Cash Receive Karo", desc: "Doorstep pickup and instant payment. No questions asked!" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-6 items-start"
              >
                <div className="text-4xl font-black text-emerald-600 opacity-30">{item.step}</div>
                <div>
                  <h3 className="text-3xl font-black uppercase">{item.title}</h3>
                  <p className="text-xl text-zinc-600">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Interactive Price Estimator (Powered by Gemini) */}
      <Section className="bg-zinc-950 border-y border-white/5">
        <div className="max-w-2xl w-full bg-zinc-900 p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-400 fill-yellow-400" />
            <h2 className="text-2xl font-bold">AI Price Estimator</h2>
          </div>
          <p className="text-zinc-400 mb-8">Describe your phone's condition (e.g., "iPhone 13, cracked screen, 128GB, working") to get a quick estimate.</p>
          
          <form onSubmit={handleEstimate} className="space-y-4">
            <textarea
              value={phoneDescription}
              onChange={(e) => setPhoneDescription(e.target.value)}
              placeholder="Enter phone model and condition..."
              className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white focus:border-emerald-500 outline-none transition-colors min-h-[120px]"
            />
            <button
              disabled={loading}
              className="w-full bg-emerald-500 text-black font-black py-4 rounded-2xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Calculating..." : "GET ESTIMATE"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <AnimatePresence>
            {estimate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
              >
                <div className="text-emerald-500 font-bold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Estimated Value
                </div>
                <p className="text-lg font-medium text-white">{estimate}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* 17-20s CTA: Final Message */}
      <Section className="h-screen bg-emerald-500 text-black">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          className="text-center z-10"
        >
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-8">
            Abhi <span className="underline">DM</span> Karo!
          </h2>
          <p className="text-2xl font-bold mb-12 max-w-xl mx-auto">
            Apne purane phone ko cash mein badlo. Instant payment, zero hassle.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-12 py-6 rounded-full text-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-transform">
              <MessageSquare className="w-8 h-8" />
              SEND MESSAGE
            </button>
            <button className="bg-white text-black px-12 py-6 rounded-full text-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-transform border-4 border-black">
              WHATSAPP US
            </button>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="absolute bottom-12 left-0 w-full flex justify-center gap-8 opacity-60">
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
            <ShieldCheck className="w-4 h-4" /> 100% Secure
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
            <Zap className="w-4 h-4" /> Instant Pay
          </div>
          <div className="flex items-center gap-2 font-bold uppercase text-xs tracking-widest">
            <CheckCircle2 className="w-4 h-4" /> Best Price
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-black py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2">
            <Smartphone className="text-emerald-500" />
            CASH<span className="text-emerald-500">PHONE</span>
          </div>
          <div className="flex gap-8 text-zinc-500 font-bold uppercase text-sm">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-zinc-600 text-sm font-medium">
            © 2026 CashMyBrokenPhone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
