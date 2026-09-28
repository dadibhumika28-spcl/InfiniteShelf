import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  Truck, 
  BookOpen, 
  Headphones 
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartDeliveryFee,
    cartTotal,
    isDigitalOnlyCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    navigateTo
  } = useBookstore();

  // Physical shipping address state (only required if not digital-only)
  const [fullName, setFullName] = useState('Ananya Iyer');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [street, setStreet] = useState('Flat 402, Krishna Heritage, Jayanagar');
  const [city, setCity] = useState('Bengaluru');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('560041');

  // Digital email delivery address
  const [digitalEmail, setDigitalEmail] = useState('reader@theinfiniteshelf.com');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('reader@okhdfcbank');
  const [cardHolder, setCardHolder] = useState('Ananya Iyer');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8921');

  // Success state
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const address = isDigitalOnlyCart
      ? undefined
      : {
          fullName,
          phone,
          street,
          city,
          state: stateName,
          pincode
        };

    let paymentMethodLabel = 'UPI (Instant)';
    if (paymentMethod === 'card') paymentMethodLabel = 'Credit/Debit Card';
    if (paymentMethod === 'netbanking') paymentMethodLabel = 'Net Banking (HDFC/ICICI)';
    if (paymentMethod === 'cod') paymentMethodLabel = 'Cash on Delivery';

    const order = placeOrder(address, paymentMethodLabel);
    setPlacedOrderId(order.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-2xl max-h-[92vh] rounded-md shadow-2xl border border-[#DFD5C6] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E0D2] bg-[#F5EFEB] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-xs bg-[#23201D] text-white flex items-center justify-center text-xs font-bold font-display-brand">
              IS
            </span>
            <h2 className="font-serif-title font-bold text-lg text-[#1C1917]">
              {placedOrderId ? 'Order Confirmed' : 'Checkout & Payment'}
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1 rounded-full text-[#7B7165] hover:text-[#1C1917] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {placedOrderId ? (
            /* Order Placed Success View */
            <div className="text-center py-8 space-y-4 animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-title font-bold text-2xl text-[#1E1B18]">
                Thank you for your order!
              </h3>
              <p className="text-xs text-[#6E6457]">
                Order Reference: <strong className="font-mono text-[#1E1B18]">{placedOrderId}</strong>
              </p>
              
              <div className="p-4 bg-[#F2ECE1] border border-[#DDD3C2] rounded-xs max-w-md mx-auto text-left text-xs space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-[#786D60]">Order Status:</span>
                  <span className="font-semibold text-emerald-800">Confirmed & Processing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786D60]">Total Paid:</span>
                  <span className="font-bold text-[#1E1B18]">₹{cartTotal}</span>
                </div>
                {isDigitalOnlyCart ? (
                  <p className="text-emerald-800 font-medium pt-2 border-t border-[#DDD3C2]">
                    ⚡ Digital titles are now unlocked in your Digital Library!
                  </p>
                ) : (
                  <p className="text-[#4A4238] pt-2 border-t border-[#DDD3C2]">
                    📦 Physical package dispatched from our central archive. Estimated delivery in 3-5 business days.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-6">
                {isDigitalOnlyCart || cart.some((i) => i.isDigital) ? (
                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      navigateTo('library');
                    }}
                    className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2.5 px-6 rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Open My Digital Library</span>
                  </button>
                ) : null}
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    navigateTo('orders');
                  }}
                  className="bg-[#FAF8F5] border border-[#DDD3C2] text-[#2C2620] hover:bg-[#EAE2D5] text-xs font-semibold py-2.5 px-6 rounded-xs transition-colors cursor-pointer"
                >
                  View Order Status & Tracking
                </button>
              </div>
            </div>
          ) : (
            /* Active Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Order Summary Strip */}
              <div className="p-4 bg-[#F2ECE1] border border-[#DDD3C2] rounded-xs text-xs space-y-2">
                <div className="flex justify-between items-center font-bold text-[#1E1B18] pb-1.5 border-b border-[#DDD3C2]">
                  <span>Items in Order ({cart.length})</span>
                  <span>Amount: ₹{cartTotal}</span>
                </div>
                <div className="space-y-1 text-[#695F52]">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="truncate max-w-[320px]">
                        {item.book.title} ({item.format}) × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. SHIPPING ADDRESS: ONLY FOR PHYSICAL PURCHASES */}
              {!isDigitalOnlyCart ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8B2635]" />
                    <h3 className="font-serif-title font-bold text-base text-[#1E1B18]">
                      Shipping Address (Physical Delivery)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-[#695F52] block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div>
                      <label className="text-[#695F52] block mb-1">Phone Number</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-[#695F52] block mb-1">Street Address / Landmark</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div>
                      <label className="text-[#695F52] block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[#695F52] block mb-1">State</label>
                        <input
                          type="text"
                          required
                          value={stateName}
                          onChange={(e) => setStateName(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        />
                      </div>
                      <div>
                        <label className="text-[#695F52] block mb-1">PIN Code</label>
                        <input
                          type="text"
                          required
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Digital Delivery Notice */
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xs text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Instant Digital Access Unlocked</span>
                  </div>
                  <p className="text-emerald-800 leading-relaxed">
                    This order contains exclusively digital editions (eBooks / Audiobooks). No physical delivery address is required. All titles will be instantly activated in your personal library.
                  </p>
                  <div className="pt-2">
                    <label className="text-[#695F52] block mb-1">Account / Delivery Email:</label>
                    <input
                      type="email"
                      required
                      value={digitalEmail}
                      onChange={(e) => setDigitalEmail(e.target.value)}
                      className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                    />
                  </div>
                </div>
              )}

              {/* 2. PAYMENT METHODS (UPI, Card, Net Banking, COD) */}
              <div className="space-y-3 pt-3 border-t border-[#E8DEC0]">
                <h3 className="font-serif-title font-bold text-base text-[#1E1B18]">
                  Select Payment Method (Demo Gateway)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xs border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#8B2635] bg-[#8B2635]/10 font-bold text-[#8B2635]'
                        : 'border-[#DDD3C2] bg-[#FAF8F5]'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mb-1" />
                    <span>UPI (Google Pay / PhonePe)</span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xs border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#8B2635] bg-[#8B2635]/10 font-bold text-[#8B2635]'
                        : 'border-[#DDD3C2] bg-[#FAF8F5]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mb-1" />
                    <span>Credit / Debit Card</span>
                  </button>

                  {/* Net Banking */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xs border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#8B2635] bg-[#8B2635]/10 font-bold text-[#8B2635]'
                        : 'border-[#DDD3C2] bg-[#FAF8F5]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 mb-1" />
                    <span>Net Banking</span>
                  </button>

                  {/* Cash on Delivery (only eligible if physical products exist) */}
                  <button
                    type="button"
                    disabled={isDigitalOnlyCart}
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xs border text-left transition-colors cursor-pointer ${
                      isDigitalOnlyCart
                        ? 'opacity-40 cursor-not-allowed bg-gray-100 border-gray-200'
                        : paymentMethod === 'cod'
                        ? 'border-[#8B2635] bg-[#8B2635]/10 font-bold text-[#8B2635]'
                        : 'border-[#DDD3C2] bg-[#FAF8F5]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 mb-1" />
                    <span>Cash on Delivery</span>
                    {isDigitalOnlyCart && <span className="block text-[9px] text-[#8C8275]">(Physical only)</span>}
                  </button>
                </div>

                {/* Payment Detail Inputs */}
                {paymentMethod === 'upi' && (
                  <div className="p-3 bg-[#F2ECE1] rounded-xs text-xs space-y-1">
                    <label className="text-[#695F52] block">Enter Virtual Payment Address (VPA / UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                    />
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-3 bg-[#F2ECE1] rounded-xs text-xs space-y-2">
                    <div>
                      <label className="text-[#695F52] block">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[#695F52] block">Name on Card</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value)}
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        />
                      </div>
                      <div>
                        <label className="text-[#695F52] block">Expiry / CVV</label>
                        <input
                          type="text"
                          defaultValue="08/29 · 382"
                          className="w-full bg-[#FAF8F5] border border-[#DDD3C2] p-2 rounded-xs focus:outline-none focus:border-[#8B2635]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E8DEC0]">
                <button
                  type="submit"
                  className="w-full bg-[#23201D] hover:bg-[#8B2635] text-white text-sm font-semibold py-3 px-6 rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Authorize & Place Order (₹{cartTotal})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
