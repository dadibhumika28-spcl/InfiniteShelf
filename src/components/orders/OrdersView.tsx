import React from 'react';
import { 
  Package, 
  CheckCircle2, 
  Truck, 
  Clock, 
  BookOpen, 
  Headphones, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useBookstore } from '../../context/BookstoreContext';
import { OrderStatus } from '../../types/book';

export const OrdersView: React.FC = () => {
  const { orders, navigateTo, openEbookReader, openAudiobook, getBookById } = useBookstore();

  const PHYSICAL_STEPS: OrderStatus[] = ['Ordered', 'Confirmed', 'Packed', 'Shipped', 'Delivered'];

  const getStepIndex = (status: OrderStatus) => {
    const idx = PHYSICAL_STEPS.indexOf(status);
    return idx >= 0 ? idx : 1;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      
      {/* Header */}
      <div className="pb-6 border-b border-[#E8DEC0] mb-8">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B2635]">
          Your Purchases
        </span>
        <h1 className="font-serif-title text-3xl font-bold text-[#1E1B18] mt-1">
          Orders & Deliveries
        </h1>
        <p className="text-xs text-[#7A7063] font-reading italic mt-1">
          Track physical courier dispatches and manage instant digital licenses.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-[#FAF8F5] border border-[#DDD3C2] rounded-sm p-8">
          <Package className="w-12 h-12 text-[#9A8F82] mx-auto mb-3" />
          <h3 className="font-serif-title font-bold text-lg text-[#1E1B18]">
            No Orders on Record
          </h3>
          <p className="text-xs text-[#706659] mt-2">
            You haven’t placed any orders yet. Discover our curated catalog.
          </p>
          <button
            onClick={() => navigateTo('explore')}
            className="mt-5 bg-[#23201D] text-white text-xs px-5 py-2 rounded-xs font-semibold hover:bg-[#8B2635] transition-colors cursor-pointer"
          >
            Explore Books
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const currentStepIdx = getStepIndex(order.status);

            return (
              <div
                key={order.id}
                className="bg-[#FAF8F5] border border-[#E8DEC0] rounded-sm overflow-hidden shadow-xs"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:px-6 bg-[#F4EFE9] border-b border-[#E8DEC0] flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="text-[#7A7063] block text-[10px] uppercase tracking-wider">
                      Order Reference
                    </span>
                    <strong className="font-mono text-[#1E1B18] text-sm">{order.id}</strong>
                  </div>
                  <div>
                    <span className="text-[#7A7063] block text-[10px] uppercase tracking-wider">
                      Order Date
                    </span>
                    <span className="text-[#3A3228] font-medium">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7063] block text-[10px] uppercase tracking-wider">
                      Payment
                    </span>
                    <span className="text-[#3A3228] font-medium">{order.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-[#7A7063] block text-[10px] uppercase tracking-wider">
                      Total
                    </span>
                    <strong className="font-serif-title text-[#1E1B18] text-base">₹{order.total}</strong>
                  </div>
                </div>

                {/* Progress Tracking Timeline */}
                <div className="p-4 sm:p-6 border-b border-[#E8DEC0] bg-[#FBF9F6]">
                  {order.isDigitalOnly ? (
                    /* Digital Tracker: Purchased -> Available in Library */
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold bg-emerald-100/80 px-3 py-1.5 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Purchased & Immediately Available in Library</span>
                      </div>
                      <button
                        onClick={() => navigateTo('library')}
                        className="text-xs font-semibold text-[#8B2635] hover:underline flex items-center gap-1 cursor-pointer ml-auto"
                      >
                        <span>Go to My Digital Library</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    /* Physical Tracker: Ordered → Confirmed → Packed → Shipped → Delivered */
                    <div>
                      <div className="flex items-center justify-between text-xs mb-3 font-medium">
                        <span className="text-[#8B2635] font-bold">
                          Status: {order.status}
                        </span>
                        <span className="text-[#7A7063]">
                          {order.estimatedDelivery}
                        </span>
                      </div>

                      {/* 5-step progress line */}
                      <div className="relative flex items-center justify-between">
                        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#E2D8C9] z-0" />
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#8B2635] z-0 transition-all duration-500"
                          style={{
                            width: `${(currentStepIdx / (PHYSICAL_STEPS.length - 1)) * 100}%`
                          }}
                        />

                        {PHYSICAL_STEPS.map((step, idx) => {
                          const isDone = idx <= currentStepIdx;
                          return (
                            <div key={step} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                                  isDone
                                    ? 'bg-[#8B2635] text-white shadow-xs'
                                    : 'bg-[#FAF8F5] border-2 border-[#DDD3C2] text-[#8C8275]'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span
                                className={`text-[10px] mt-1 hidden sm:block ${
                                  isDone ? 'font-bold text-[#1E1B18]' : 'text-[#8C8275]'
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Items in this Order */}
                <div className="p-4 sm:p-6 divide-y divide-[#EDE5D8]">
                  {order.items.map((item, idx) => {
                    const book = getBookById(item.bookId);

                    return (
                      <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="w-12 h-16 object-cover rounded-xs shadow-xs"
                          />
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#8B2635]">
                              {item.format} Edition
                            </span>
                            <h4 className="font-serif-title font-bold text-sm text-[#1E1B18]">
                              {item.title}
                            </h4>
                            <p className="text-xs text-[#7A7063] font-reading italic">
                              by {item.author}
                            </p>
                            <span className="text-xs text-[#52493E]">
                              Qty: {item.quantity} · ₹{item.price} each
                            </span>
                          </div>
                        </div>

                        {/* If this is digital, provide 1-click reader/audiobook launch */}
                        {item.isDigital && book && (
                          <div className="flex items-center gap-2">
                            {item.format === 'eBook' && (
                              <button
                                onClick={() => openEbookReader(book)}
                                className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-1.5 px-3 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>Read</span>
                              </button>
                            )}
                            {item.format === 'Audiobook' && (
                              <button
                                onClick={() => openAudiobook(book)}
                                className="bg-[#23201D] hover:bg-[#8B2635] text-white text-xs font-semibold py-1.5 px-3 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                              >
                                <Headphones className="w-3.5 h-3.5" />
                                <span>Listen</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Shipping address footer (if physical) */}
                {order.shippingAddress && (
                  <div className="p-4 bg-[#F5EFEB] border-t border-[#E8DEC0] text-xs text-[#6B6154] flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <span className="font-semibold text-[#1E1B18]">Dispatched to: </span>
                      <span>
                        {order.shippingAddress.fullName}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                      </span>
                    </div>
                    <span className="text-[#8C8275]">Contact: {order.shippingAddress.phone}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
