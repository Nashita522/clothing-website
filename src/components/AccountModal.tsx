import React, { useState } from 'react';
import { X, User, Package, MapPin, LogOut, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    user,
    loginUser,
    logoutUser,
    orders
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  if (!isAccountOpen) return null;

  const formatBDT = (val: number) => `৳ ${val.toLocaleString('en-US')}`;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = authMode === 'signup' ? nameInput || 'Fashion Enthusiast' : 'Amina Rahman';
    const email = emailInput || 'customer@trendycollection.com';
    loginUser(name, email);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => setIsAccountOpen(false)} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[90vh] border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-[#F7F7FB]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#315CFF] text-white flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <h2 className="text-base font-black text-[#111C3A]">
              {user ? 'MY TC ACCOUNT' : 'WELCOME TO TRENDY COLLECTION'}
            </h2>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {user ? (
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#111C3A] to-[#0B0B12] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#315CFF] to-[#8B5CF6] flex items-center justify-center font-black text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold">{user.name}</h3>
                    <p className="text-xs text-[#A5B4FC]">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono uppercase tracking-widest bg-[#315CFF]/30 text-white px-2 py-0.5 rounded-full border border-[#315CFF]/50">
                      VIP Member Tier
                    </span>
                  </div>
                </div>
                <button
                  onClick={logoutUser}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-gray-200 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'profile'
                      ? 'border-[#315CFF] text-[#315CFF]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Profile &amp; Perks
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'orders'
                      ? 'border-[#315CFF] text-[#315CFF]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  <span>Orders</span>
                  <span className="bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded-full text-[10px]">
                    {orders.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`pb-2.5 px-4 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'addresses'
                      ? 'border-[#315CFF] text-[#315CFF]'
                      : 'border-transparent text-gray-400 hover:text-gray-700'
                  }`}
                >
                  Saved Addresses
                </button>
              </div>

              {/* Tab: Orders */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-xs text-gray-500 py-6 text-center">No orders placed yet.</p>
                  ) : (
                    orders.map((o) => (
                      <div
                        key={o.id}
                        className="p-4 rounded-2xl bg-[#F7F7FB] border border-gray-150 space-y-3 text-xs"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                          <div>
                            <span className="font-mono font-bold text-[#111C3A]">{o.id}</span>
                            <span className="text-gray-400 ml-2">&bull; {o.date}</span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                            {o.status}
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-gray-700 font-medium">
                                {it.quantity}x {it.productName} ({it.size})
                              </span>
                              <span className="font-bold text-gray-900">{formatBDT(it.price * it.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-[#111C3A]">
                          <span>Total</span>
                          <span>{formatBDT(o.total)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Tab: Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-4 text-xs text-gray-600">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="text-gray-400">Default Currency</p>
                      <p className="font-bold text-gray-900">BDT (৳ Bangladeshi Taka)</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-xl border">
                      <p className="text-gray-400">Membership Points</p>
                      <p className="font-bold text-[#315CFF]">1,450 TC Points</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400">
                    * Profile details are simulated locally for this demonstration session.
                  </p>
                </div>
              )}

              {/* Tab: Addresses */}
              {activeTab === 'addresses' && (
                <div className="space-y-3 text-xs">
                  <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#315CFF] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-gray-900">Primary Delivery Address (Banani)</p>
                      <p className="text-gray-600">House 42, Road 11, Banani, Dhaka 1213</p>
                      <p className="text-gray-500 mt-0.5">Phone: +880 1712 345678</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          ) : (
            /* Auth Form (Sign In / Sign Up) */
            <form onSubmit={handleAuthSubmit} className="space-y-4 max-w-sm mx-auto">
              <div className="flex border-b border-gray-200 mb-4 text-xs font-bold text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 pb-2 border-b-2 cursor-pointer ${
                    authMode === 'signin'
                      ? 'border-[#315CFF] text-[#315CFF]'
                      : 'border-transparent text-gray-400'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 pb-2 border-b-2 cursor-pointer ${
                    authMode === 'signup'
                      ? 'border-[#315CFF] text-[#315CFF]'
                      : 'border-transparent text-gray-400'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Amina Rahman"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold text-xs tracking-wider transition-all shadow-md cursor-pointer"
              >
                {authMode === 'signin' ? 'Sign In to TC Account' : 'Register New Account'}
              </button>

              <p className="text-[11px] text-gray-400 text-center">
                * Demo authentication. Any credentials will log in immediately.
              </p>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
