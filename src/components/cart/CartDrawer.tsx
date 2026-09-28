import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Tag, 
  Check, 
  BookOpen, 
  Headphones 
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    cartCount,
    cartSubtotal,
    cartDiscount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    cartDeliveryFee,
    cartTotal,
    isDigitalOnlyCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    navigateTo
  } = useBookstore();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
      setCouponCodeInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div 
        className="bg-[#FAF8F5] w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-[#DFD5C6] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-[#E8E0D2] bg-[#F5EFEB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#8B2635]" />
            <h2 className="font-serif-title font-bold text-lg text-[#1C1917]">
              Your Reading Bag ({cartCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-[#7B7165] hover:text-[#1C1917] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator (Only if order has physical items) */}
        {!isDigitalOnlyCart && cart.length > 0 && (
          <div className="bg-[#ECE3D5] px-6 py-2.5 text-xs text-[#4A4238] border-b border-[#DDD3C2]">
            {cartSubtotal >= 499 ? (
              <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Congratulations! You have qualified for Free Delivery.
              </span>
            ) : (
              <span>
                Add <strong className="text-[#8B2635]">₹{499 - cartSubtotal}</strong> more of physical books for complimentary shipping (₹49 standard).
              </span>
            )}
          </div>
        )}

        {/* Digital Only Banner */}
        {isDigitalOnlyCart && cart.length > 0 && (
          <div className="bg-emerald-50 px-6 py-2 text-xs text-emerald-900 border-b border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>All digital items in bag — Zero shipping fees & instant library access!</span>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#B3A796] mx-auto" />
              <h3 className="font-serif-title font-bold text-lg text-[#1E1B18]">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#7A7063] max-w-xs mx-auto">
                Discover classic literature, new releases, and rare digital gems on our shelves.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigateTo('explore');
                }}
                className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-2.5 px-6 rounded-xs transition-colors cursor-pointer"
              >
                Browse Books
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = item.price * item.quantity;
              return (
                <div
                  key={item.id}
                  className="p-3.5 bg-[#FAF8F5] border border-[#EAE3D6] rounded-xs shadow-xs flex gap-3.5 relative group"
                >
                  {/* Book Cover */}
                  <div className="w-16 h-24 shrink-0 overflow-hidden rounded-xs bg-[#F2ECE3] shadow-xs">
                    <img
                      src={item.book.cover}
                      alt={item.book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#8B2635]">
                        {item.format === 'Audiobook' && <Headphones className="w-3 h-3" />}
                        {item.format === 'eBook' && <BookOpen className="w-3 h-3" />}
                        <span>{item.format} Edition</span>
                      </div>
                      <h4 className="font-serif-title font-bold text-sm text-[#1E1B18] truncate mt-0.5">
                        {item.book.title}
                      </h4>
                      <p className="text-xs text-[#6B6154] font-reading italic truncate">
                        by {item.book.author}
                      </p>
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EAE0]">
                      <div className="flex items-center border border-[#DDD3C2] rounded-xs bg-[#FAF8F5]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#665D52] hover:text-[#1E1B18] cursor-pointer"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-[#1E1B18]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-[#665D52] hover:text-[#1E1B18] cursor-pointer"
                          title="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Pricing */}
                      <div className="text-right">
                        <span className="font-serif-title font-bold text-sm text-[#1E1B18]">
                          ₹{itemTotal}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-[#8C8275] block">
                            (₹{item.price} each)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions: Move to Wishlist / Remove */}
                    <div className="flex items-center gap-3 mt-2 text-[11px] text-[#8C8275]">
                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="hover:text-[#8B2635] flex items-center gap-1 cursor-pointer"
                      >
                        <Heart className="w-3 h-3" /> Move to Wishlist
                      </button>
                      <span>·</span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="hover:text-red-700 flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer with Calculations & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 bg-[#F5EFEB] border-t border-[#E8E0D2] space-y-4">
            
            {/* Promo Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCodeInput}
                onChange={(e) => setCouponCodeInput(e.target.value)}
                placeholder="Promo code (e.g. SHELF10)"
                className="bg-[#FAF8F5] border border-[#DDD3C2] text-xs px-3 py-2 rounded-xs flex-1 uppercase focus:outline-none focus:border-[#8B2635]"
              />
              <button
                type="submit"
                className="bg-[#23201D] text-white text-xs px-4 py-2 rounded-xs font-semibold hover:bg-[#8B2635] transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedCoupon && (
              <div className="flex items-center justify-between text-xs bg-emerald-100/70 border border-emerald-300 p-2 rounded-xs text-emerald-900">
                <span className="flex items-center gap-1.5 font-medium">
                  <Tag className="w-3.5 h-3.5 text-emerald-700" /> Code '{appliedCoupon}' applied (-10%)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-700 hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#52493E] pt-2 border-t border-[#EAE3D6]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1E1B18]">₹{cartSubtotal}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-[#8B2635]">
                  <span>Discount</span>
                  <span>-₹{cartDiscount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>
                  {cartDeliveryFee === 0 ? (
                    <strong className="text-emerald-700 font-semibold uppercase text-[11px]">
                      Complimentary (Free)
                    </strong>
                  ) : (
                    `₹${cartDeliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif-title font-bold text-[#1E1B18] pt-2 border-t border-[#EAE3D6]">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-[#23201D] hover:bg-[#8B2635] text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
