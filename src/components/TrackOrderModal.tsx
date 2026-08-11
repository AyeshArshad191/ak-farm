import React, { useState } from 'react';
import { X, Search, Package, Clock, CheckCircle2, Truck, MapPin, Phone, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order } from '../types';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  const { orders } = useStore();
  const [query, setQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanQuery ||
        o.customer.phone.replace(/[^0-9]/g, '').includes(cleanQuery.replace(/[^0-9]/g, ''))
    );

    setFoundOrder(match || null);
    setSearched(true);
  };

  const getStatusStep = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      case 'Cancelled':
        return 0;
      default:
        return 1;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 bg-[#1b4d2e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Truck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold leading-snug">Track Your Order</h3>
              <p className="text-xs text-emerald-100/80">Enter your Order ID (e.g. AKF-1001) or Mobile Number</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Order ID (e.g. AKF-1001) or Phone (0300...)"
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-300 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#1b4d2e] focus:bg-white font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1b4d2e] hover:bg-[#133921] text-white font-bold rounded-2xl text-xs transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Track</span>
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Order Sample Badges */}
          {!searched && (
            <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs space-y-2">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <Package className="w-4 h-4 text-amber-700" />
                Sample Orders in System:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {orders.slice(0, 3).map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => {
                      setQuery(ord.id);
                      setFoundOrder(ord);
                      setSearched(true);
                    }}
                    className="px-3 py-1 bg-white hover:bg-amber-100 border border-amber-300 text-amber-900 font-mono font-bold rounded-xl transition-colors text-[11px] cursor-pointer"
                  >
                    #{ord.id} ({ord.customer.fullName})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Result - Not Found */}
          {searched && !foundOrder && (
            <div className="text-center py-8 bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-6 space-y-2">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h4 className="font-bold text-stone-800 text-sm">No Order Found</h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                We couldn't find an order matching "<strong>{query}</strong>". Please verify your Order ID from your SMS/receipt or contact our WhatsApp support.
              </p>
            </div>
          )}

          {/* Search Result - Found Order Details */}
          {foundOrder && (
            <div className="space-y-6">
              
              {/* Order Meta Bar */}
              <div className="bg-[#f7f5ef] p-4 rounded-2xl border border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Order Reference</span>
                  <span className="font-mono font-black text-lg text-[#1b4d2e]">#{foundOrder.id}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Date Placed</span>
                  <span className="text-xs font-semibold text-stone-700">
                    {new Date(foundOrder.createdAt).toLocaleDateString('en-PK', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    foundOrder.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : foundOrder.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {foundOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Timeline Progress Bar */}
              {foundOrder.status !== 'Cancelled' && (
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Live Delivery Progress</h4>
                  
                  <div className="relative flex items-center justify-between">
                    {/* Line behind steps */}
                    <div className="absolute top-1/2 left-4 right-4 h-1 bg-stone-200 -translate-y-1/2 -z-0"></div>
                    <div
                      className="absolute top-1/2 left-4 h-1 bg-[#1b4d2e] -translate-y-1/2 -z-0 transition-all duration-500"
                      style={{
                        width: `${((getStatusStep(foundOrder.status) - 1) / 3) * 100}%`
                      }}
                    ></div>

                    {/* Step 1: Placed */}
                    <div className="relative z-10 flex flex-col items-center bg-white px-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        getStatusStep(foundOrder.status) >= 1
                          ? 'bg-[#1b4d2e] text-white shadow'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 mt-1">Placed</span>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="relative z-10 flex flex-col items-center bg-white px-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        getStatusStep(foundOrder.status) >= 2
                          ? 'bg-[#1b4d2e] text-white shadow'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 mt-1">Processing</span>
                    </div>

                    {/* Step 3: Dispatched */}
                    <div className="relative z-10 flex flex-col items-center bg-white px-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        getStatusStep(foundOrder.status) >= 3
                          ? 'bg-[#1b4d2e] text-white shadow'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        <Truck className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 mt-1">Dispatched</span>
                    </div>

                    {/* Step 4: Delivered */}
                    <div className="relative z-10 flex flex-col items-center bg-white px-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        getStatusStep(foundOrder.status) >= 4
                          ? 'bg-emerald-600 text-white shadow'
                          : 'bg-stone-200 text-stone-500'
                      }`}>
                        <Package className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 mt-1">Delivered</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Items Ordered ({foundOrder.items.length})</h4>
                <div className="space-y-2 border border-stone-200 rounded-2xl p-3 bg-stone-50/50">
                  {foundOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-stone-200/60 last:border-0">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.productName}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-bold text-stone-800">{item.productName}</p>
                          <span className="text-[10px] text-stone-500">{item.sizeName} × {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-stone-900">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="space-y-1">
                  <span className="font-bold text-stone-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#1b4d2e]" /> Delivery Address:
                  </span>
                  <p className="text-stone-600 leading-relaxed">
                    <strong>{foundOrder.customer.fullName}</strong><br />
                    {foundOrder.customer.address}, {foundOrder.customer.city}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-stone-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#1b4d2e]" /> Contact & Payment:
                  </span>
                  <p className="text-stone-600">
                    Phone: {foundOrder.customer.phone}<br />
                    Payment: <span className="uppercase font-bold text-amber-800">{foundOrder.paymentMethod}</span><br />
                    Total Amount: <strong className="text-stone-900">Rs. {foundOrder.totalAmount.toLocaleString()}</strong>
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
