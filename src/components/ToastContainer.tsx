import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-5 z-50 pointer-events-none animate-in fade-in slide-in-from-top-3 duration-200">
      <div className={`px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold ${
        toast.type === 'info'
          ? 'bg-amber-900 text-amber-50 border-amber-700'
          : 'bg-[#1b4d2e] text-white border-emerald-600'
      }`}>
        {toast.type === 'info' ? (
          <Info className="w-4 h-4 text-amber-300" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
