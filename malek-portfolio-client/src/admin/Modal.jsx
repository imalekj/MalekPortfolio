import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-surface p-6">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-heading text-lg font-medium text-white">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-secondary transition-colors duration-200 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
