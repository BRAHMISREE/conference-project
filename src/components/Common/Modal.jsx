import React from "react";

const Modal = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">

      <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md border border-white/10">

        <h3 className="text-xl font-bold text-white mb-4">
          {title}
        </h3>

        <div className="text-slate-400 mb-6">
          {children}
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/5 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 rounded-lg text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
