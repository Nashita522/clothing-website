import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles } from 'lucide-react';

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError(null);
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#111C3A] to-[#0B0B12] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-xs font-bold text-[#A5B4FC] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
          <span>JOIN THE CLUB</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
          STAY IN THE LOOP
        </h2>

        <p className="text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
          Get updates on new drops, exclusive offers, and fresh styles delivered directly to your inbox.
        </p>

        {isSubmitted ? (
          <div className="inline-flex items-center gap-3 p-4 rounded-2xl bg-[#10B981]/20 border border-[#10B981]/40 text-emerald-300 text-sm font-semibold max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
            <span>Thank you for subscribing! Your demo 20% coupon code is <strong>TRENDY20</strong>.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#315CFF] focus:ring-2 focus:ring-[#315CFF]/30 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-[#315CFF]/30 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
            {error && <p className="text-xs text-[#F43F5E] text-left">{error}</p>}
            <p className="text-[11px] text-gray-400">
              * Demo newsletter demonstration. No marketing emails or spam will be sent.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
