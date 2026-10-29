import React from 'react';
import { ShieldCheck, Sparkles, ShoppingBag, Headphones } from 'lucide-react';

export const CustomerBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Quality-First Fashion',
      description: 'Crafted with heavyweight organic cottons, French terry, and durable stitch detailing.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Encrypted checkout experience with support for bKash, cards, and doorstep verification.'
    },
    {
      icon: ShoppingBag,
      title: 'Easy Ordering',
      description: 'Instant size selection, fast bag management, and seamless real-time order review.'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Dedicated personal concierge team ready to assist your style, fit, and order queries.'
    }
  ];

  return (
    <section className="py-16 bg-white border-y border-gray-150">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div 
                key={b.title} 
                className="flex items-start gap-4 p-4 rounded-2xl transition-all hover:bg-[#F7F7FB]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1EDFF] text-[#315CFF] flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#111C3A]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
