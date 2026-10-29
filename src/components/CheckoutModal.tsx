import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Smartphone, 
  ShoppingBag, 
  ArrowLeft,
  Sparkles,
  Copy
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    promoCode,
    discountPercentage,
    placeOrder,
    showToast
  } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'confirmed'>('details');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('Amina Rahman');
  const [email, setEmail] = useState('amina.rahman@trendycollection.com');
  const [phone, setPhone] = useState('+880 1712 345678');
  const [address, setAddress] = useState('House 42, Road 11, Banani');
  const [city, setCity] = useState('Dhaka');
  const [postalCode, setPostalCode] = useState('1213');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Card' | 'COD'>('bKash');

  // Card demo states
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // bKash demo state
  const [bkashNumber, setBkashNumber] = useState('01712345678');

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const shippingFee = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 120;
  const discountAmount = Math.round(cartSubtotal * (discountPercentage / 100));
  const finalTotal = cartSubtotal - discountAmount + shippingFee;

  const formatBDT = (val: number) => `৳ ${val.toLocaleString('en-US')}`;

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !city) {
      showToast('Please fill all mandatory shipping fields.');
      return;
    }
    setStep('payment');
  };

  const handleCompleteOrder = () => {
    const orderItems = cart.map((c) => ({
      productName: c.product.name,
      size: c.size,
      colorName: c.color.name,
      price: c.product.price,
      quantity: c.quantity,
      image: c.product.images[0]
    }));

    const order = placeOrder({
      items: orderItems,
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingFee,
      total: finalTotal,
      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        postalCode
      },
      paymentMethod: 
        paymentMethod === 'bKash' ? 'bKash Online' :
        paymentMethod === 'Nagad' ? 'Nagad Mobile' :
        paymentMethod === 'Card' ? 'Visa / Mastercard (Demo)' : 'Cash on Delivery'
    });

    setConfirmedOrder(order);
    setStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={() => {
          if (step !== 'confirmed') setIsCheckoutOpen(false);
        }} 
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 my-8 flex flex-col max-h-[92vh] border border-gray-150 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-150 flex items-center justify-between bg-[#F7F7FB]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#111C3A] text-white flex items-center justify-center font-bold text-sm">
              TC
            </div>
            <div>
              <h2 className="text-base font-black text-[#111C3A]">
                TRENDY COLLECTION CHECKOUT
              </h2>
              <p className="text-[11px] text-gray-500 font-mono">
                {step === 'details' && 'Step 1 of 2: Shipping & Customer Info'}
                {step === 'payment' && 'Step 2 of 2: Payment & Verification'}
                {step === 'confirmed' && 'Order Placed & Confirmed'}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="overflow-y-auto p-6 sm:p-8 flex-1">
          
          {/* STEP 1: SHIPPING & CONTACT */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Demo Mode Active:</strong> No real payment is collected or card stored. Feel free to use test details.
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Contact Phone (for delivery SMS &amp; courier verification) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-150">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  2. Delivery Address
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Street Address / House / Flat *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City / Region *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#315CFF]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Quick Summary */}
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-500">Bag Subtotal: </span>
                  <span className="font-bold text-[#111C3A]">{formatBDT(cartSubtotal)}</span>
                  {discountAmount > 0 && (
                    <span className="text-[#8B5CF6] font-bold ml-2">(-{discountPercentage}% coupon)</span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-gray-500">Total: </span>
                  <span className="text-sm font-black text-[#111C3A]">{formatBDT(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#315CFF]/30 transition-all cursor-pointer"
              >
                Proceed to Payment Method &rarr;
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT METHOD SELECTION */}
          {step === 'payment' && (
            <div className="space-y-6">
              <button
                onClick={() => setStep('details')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping Address</span>
              </button>

              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
                  Select Payment Method (Simulation)
                </h3>

                {/* Option 1: bKash */}
                <label
                  onClick={() => setPaymentMethod('bKash')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'bKash'
                      ? 'border-[#E2136E] bg-[#E2136E]/5 ring-2 ring-[#E2136E]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#E2136E] text-white flex items-center justify-center font-black text-xs">
                      bK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">bKash Online Payment</p>
                      <p className="text-[11px] text-gray-500">Fast checkout via bKash personal or merchant wallet</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bKash'}
                    onChange={() => setPaymentMethod('bKash')}
                    className="accent-[#E2136E]"
                  />
                </label>

                {/* Option 2: Nagad */}
                <label
                  onClick={() => setPaymentMethod('Nagad')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Nagad'
                      ? 'border-[#F7931E] bg-[#F7931E]/5 ring-2 ring-[#F7931E]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F7931E] text-white flex items-center justify-center font-black text-xs">
                      N
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Nagad Mobile Banking</p>
                      <p className="text-[11px] text-gray-500">Pay using your Nagad account credentials</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Nagad'}
                    onChange={() => setPaymentMethod('Nagad')}
                    className="accent-[#F7931E]"
                  />
                </label>

                {/* Option 3: Credit/Debit Card */}
                <label
                  onClick={() => setPaymentMethod('Card')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Card'
                      ? 'border-[#315CFF] bg-[#315CFF]/5 ring-2 ring-[#315CFF]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#111C3A] text-white flex items-center justify-center">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Visa / Mastercard / Amex</p>
                      <p className="text-[11px] text-gray-500">Secure card processing simulation</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="accent-[#315CFF]"
                  />
                </label>

                {/* Option 4: COD */}
                <label
                  onClick={() => setPaymentMethod('COD')}
                  className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'COD'
                      ? 'border-[#10B981] bg-[#10B981]/5 ring-2 ring-[#10B981]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#10B981] text-white flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</p>
                      <p className="text-[11px] text-gray-500">Pay when your parcel arrives at your doorstep</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="accent-[#10B981]"
                  />
                </label>
              </div>

              {/* Dynamic Sub-form based on selection */}
              {paymentMethod === 'bKash' && (
                <div className="p-4 rounded-xl bg-[#E2136E]/10 border border-[#E2136E]/30 space-y-2">
                  <label className="block text-xs font-bold text-[#E2136E]">
                    bKash Account Number:
                  </label>
                  <input
                    type="text"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs font-mono"
                  />
                  <p className="text-[11px] text-gray-600">
                    A test verification OTP will be auto-confirmed in this demo.
                  </p>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white border border-gray-300 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Final Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600 border-t border-gray-150 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-gray-900">{formatBDT(cartSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#8B5CF6] font-bold">
                    <span>Discount applied ({discountPercentage}%):</span>
                    <span>-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span className="font-semibold">{shippingFee === 0 ? 'FREE' : formatBDT(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-[#111C3A] border-t border-gray-200 pt-2">
                  <span>Grand Total:</span>
                  <span>{formatBDT(finalTotal)}</span>
                </div>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="w-full py-4 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-black text-sm tracking-wide shadow-lg shadow-[#315CFF]/30 transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm &amp; Place Demo Order &bull; {formatBDT(finalTotal)}</span>
              </button>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED RECEIPT */}
          {step === 'confirmed' && confirmedOrder && (
            <div className="text-center space-y-6 py-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-[#8B5CF6]">
                  Order Placed Successfully
                </span>
                <h3 className="text-2xl font-black text-[#111C3A]">
                  THANK YOU FOR YOUR ORDER!
                </h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  A verification confirmation has been sent to <strong>{email}</strong>.
                </p>
              </div>

              {/* Order Box */}
              <div className="bg-[#F7F7FB] border border-gray-200 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div>
                    <p className="text-gray-400">Order Reference</p>
                    <p className="text-sm font-black font-mono text-[#111C3A]">{confirmedOrder.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Date</p>
                    <p className="font-semibold text-gray-800">{confirmedOrder.date}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-gray-700">Ordered Items ({confirmedOrder.items.length}):</p>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex items-center justify-between text-gray-700">
                      <span className="truncate max-w-[200px]">
                        {it.quantity}x {it.productName} ({it.size})
                      </span>
                      <span className="font-bold">{formatBDT(it.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-3 space-y-1 text-gray-600">
                  <div className="flex justify-between">
                    <span>Payment Method:</span>
                    <span className="font-semibold text-gray-900">{confirmedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivering To:</span>
                    <span className="font-semibold text-gray-900">{confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-[#111C3A] pt-2 border-t border-gray-200">
                    <span>Total Paid:</span>
                    <span>{formatBDT(confirmedOrder.total)}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-8 py-3.5 rounded-xl bg-[#111C3A] hover:bg-[#315CFF] text-white font-bold text-xs tracking-wider transition-colors cursor-pointer"
                >
                  Continue Browsing
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
