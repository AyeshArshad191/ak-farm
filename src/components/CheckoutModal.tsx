import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, Truck, Phone, Copy, MessageSquare, ArrowRight } from 'lucide-react';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    cartTotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    placeOrder,
    siteSettings
  } = useStore();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Lahore');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod');
  const [notes, setNotes] = useState('');

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartTotal >= 3000 ? 0 : 200;
  const finalTotal = cartTotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const order = placeOrder(
      { fullName, phone, email, address, city, notes },
      paymentMethod
    );
    setCreatedOrder(order);
  };

  const handleWhatsAppOrder = () => {
    const itemsText = cart
      .map(
        (i) => `• ${i.product.name} (${i.selectedSize.name}) x ${i.quantity} = Rs. ${(i.selectedSize.price * i.quantity).toLocaleString()}`
      )
      .join('\n');

    const message = `*NEW ORDER FROM AK FARM WEBSITE*\n\n*Customer:* ${fullName}\n*Phone:* ${phone}\n*City:* ${city}\n*Address:* ${address}\n\n*Order Items:*\n${itemsText}\n\n*Subtotal:* Rs. ${cartTotal.toLocaleString()}\n*Delivery:* Rs. ${deliveryFee}\n*Total:* Rs. ${finalTotal.toLocaleString()}\n*Payment:* ${paymentMethod.toUpperCase()}`;

    const url = `https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#fcfbf7] border border-stone-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto relative">
        
        {/* Header */}
        <div className="p-4 sm:px-6 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#1b4d2e]" />
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              {createdOrder ? 'Order Confirmed!' : 'Checkout & Shipping'}
            </h3>
          </div>

          <button
            onClick={() => {
              setIsCheckoutOpen(false);
              setCreatedOrder(null);
            }}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {createdOrder ? (
            /* Order Success Receipt */
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-[#1b4d2e] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif font-black text-2xl text-stone-900">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-stone-600">
                  Your Order ID is <strong className="text-[#1b4d2e] font-mono">{createdOrder.id}</strong>
                </p>
              </div>

              {/* Order Box */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Customer:</span>
                  <span className="font-bold text-stone-900">{createdOrder.customer.fullName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Phone:</span>
                  <span className="font-bold text-stone-900">{createdOrder.customer.phone}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-bold text-stone-900">{createdOrder.customer.address}, {createdOrder.customer.city}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Payment Method:</span>
                  <span className="font-bold uppercase text-[#1b4d2e]">{createdOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-stone-900">
                  <span>Total Payable:</span>
                  <span className="font-serif text-[#b45309]">Rs. {createdOrder.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* WhatsApp notification prompt */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl max-w-md mx-auto space-y-2">
                <p className="text-xs text-emerald-900 font-semibold">
                  Want instant tracking on WhatsApp? Send your order details to AK Farm support team:
                </p>
                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Send Order to WhatsApp ({siteSettings.phone})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setCreatedOrder(null);
                }}
                className="px-6 py-2.5 bg-[#1b4d2e] text-white text-xs font-bold rounded-xl"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Shipping Address Inputs */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  1. Shipping Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ali Ahmed"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      placeholder="Lahore, Karachi, Islamabad, Multan..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase mb-1">
                    Street Address & House / Apartment No. *
                  </label>
                  <textarea
                    placeholder="House number, Street name, Area name..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#1b4d2e]"
                    rows={2}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-stone-900 text-sm">
                  2. Select Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'cod'
                        ? 'bg-emerald-50/80 border-[#1b4d2e] ring-2 ring-[#1b4d2e]/20'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#1b4d2e]"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">Cash on Delivery (COD)</div>
                      <div className="text-[10px] text-stone-500">Pay cash when package arrives</div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition-all ${
                      paymentMethod === 'bank'
                        ? 'bg-emerald-50/80 border-[#1b4d2e] ring-2 ring-[#1b4d2e]/20'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="text-[#1b4d2e]"
                    />
                    <div>
                      <div className="text-xs font-bold text-stone-900">Direct Bank Deposit / JazzCash</div>
                      <div className="text-[10px] text-stone-500">Meezan Bank / EasyPaisa / JazzCash</div>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'bank' && (
                  <div className="p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-xs space-y-1 text-stone-700">
                    <p className="font-bold text-stone-900">Bank Details for Direct Deposit:</p>
                    <p><strong>Bank:</strong> Meezan Bank Limited</p>
                    <p><strong>Account Title:</strong> AK FARM ORGANICS</p>
                    <p><strong>Account No:</strong> 0201 0109823421</p>
                    <p className="text-[11px] text-amber-800 pt-1">
                      * Please WhatsApp payment screenshot to 0303 7567324 after sending deposit.
                    </p>
                  </div>
                )}
              </div>

              {/* Order Summary Box */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                <h4 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">
                  Order Summary ({cart.length} items)
                </h4>
                <div className="space-y-1 text-xs text-stone-600 max-h-32 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="truncate max-w-[200px]">
                        {item.product.name} ({item.selectedSize.name}) x {item.quantity}
                      </span>
                      <span className="font-semibold text-stone-900">
                        Rs. {(item.selectedSize.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-xs font-semibold text-stone-800">
                  <span>Shipping Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between text-base font-black font-serif text-[#1b4d2e] pt-1">
                  <span>Total Payable:</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#1b4d2e] hover:bg-[#12361f] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order Now (Rs. {finalTotal.toLocaleString()})</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
