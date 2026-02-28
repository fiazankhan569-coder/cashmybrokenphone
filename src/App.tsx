/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { 
  Smartphone, 
  Zap, 
  Droplets, 
  BatteryLow, 
  Cpu, 
  ArrowRight, 
  MessageSquare, 
  DollarSign,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

const Section = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <section className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-20 ${className}`}>
    {children}
  </section>
);

export default function App() {
  const [estimate, setEstimate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [phoneDescription, setPhoneDescription] = useState('');

  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // ✅ DEMO ESTIMATE FUNCTION (NO AI)
  const handleEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneDescription) return;

    setLoading(true);

    setTimeout(() => {
      setEstimate("₹3,000 - ₹6,000 (Demo Estimate)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div ref={containerRef} className="bg-[#050505] text-white font-sans">

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center backdrop-blur-sm bg-black/20">
        <div className="text-2xl font-black tracking-tighter italic flex items-center gap-2">
          <Smartphone className="text-emerald-500" />
          CASH<span className="text-emerald-500">PHONE</span>
        </div>
      </nav>

      {/* HERO */}
      <Section className="text-center">
        <h1 className="text-5xl md:text-8xl font-black uppercase mb-6">
          Broken Phone?
        </h1>
        <p className="text-xl text-zinc-400">
          Don’t throw it. Turn it into cash 💸
        </p>
      </Section>

      {/* FEATURES */}
      <Section className="bg-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <Droplets className="mx-auto mb-4 text-blue-400 w-10 h-10" />
            Water Damage
          </div>
          <div>
            <Smartphone className="mx-auto mb-4 text-red-400 w-10 h-10" />
            Broken Screen
          </div>
          <div>
            <BatteryLow className="mx-auto mb-4 text-yellow-400 w-10 h-10" />
            Dead Battery
          </div>
        </div>
      </Section>

      {/* PRICE ESTIMATOR */}
      <Section className="bg-zinc-950">
        <div className="max-w-2xl w-full bg-zinc-900 p-8 rounded-3xl border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-400" />
            <h2 className="text-2xl font-bold">Price Estimator</h2>
          </div>

          <form onSubmit={handleEstimate} className="space-y-4">
            <textarea
              value={phoneDescription}
              onChange={(e) => setPhoneDescription(e.target.value)}
              placeholder="Enter phone model and condition..."
              className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white outline-none"
            />

            <button
              disabled={loading}
              className="w-full bg-emerald-500 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2"
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
                className="mt-6 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl"
              >
                <div className="text-emerald-500 font-bold mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Estimated Value
                </div>
                <p className="text-lg">{estimate}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-emerald-500 text-black text-center">
        <h2 className="text-5xl font-black mb-6">DM Us Now!</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button className="bg-black text-white px-8 py-4 rounded-full flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            SEND MESSAGE
          </button>
          <button className="bg-white text-black px-8 py-4 rounded-full">
            WHATSAPP US
          </button>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black py-8 text-center text-zinc-500">
        <div className="flex justify-center items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4" />
          100% Secure
        </div>
        © 2026 CashMyBrokenPhone
        <p style={{ marginTop: "15px" }}>
  📱 Instagram:{" "}
  <a
    href="https://instagram.com/indiabulkscrap"
    target="_blank"
    rel="noopener noreferrer"
    style={{ fontWeight: "bold" }}
  >
    @indiabulkscrap
  </a>
</p>

<p>
  📞 Call:{" "}
  <a
    href="tel:+919179768610"
    style={{ fontWeight: "bold" }}
  >
    +91 9179768610
  </a>
</p>
      </footer>
</div>
);
}

    
