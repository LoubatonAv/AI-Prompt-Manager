import React from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        className="absolute inset-0 bg-black/60 cursor-pointer"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative mx-auto mt-20 w-[92%] max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 shadow">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-3">
          <h2 className="text-sm font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-1 text-sm hover:border-slate-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </div>
  );
}
