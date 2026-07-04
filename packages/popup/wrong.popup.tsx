"use client";

import Image from "next/image";
import { X } from "lucide-react";

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export default function ErrorModal({
  open,
  onClose,
  onRetry,
}: ErrorModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[520px] rounded-[28px] bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={28} strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="px-8 pt-8 pb-8 text-center">

          {/* Illustration */}
          <div className="mx-auto mb-8 flex justify-center">
            <Image
              src="/images/error-illustration.png"
              alt="Error"
              width={280}
              height={220}
              priority
            />
          </div>

          {/* Heading */}
          <h2 className="text-[40px] font-bold text-[#162447]">
            Something Went Wrong!
          </h2>

          {/* Description */}
          <p className="mt-5 text-[22px] leading-8 text-[#7B8495]">
            An unexpected error occurred.
            <br />
            Please try again.
          </p>

          {/* Retry Button */}
          <button
            onClick={onRetry}
            className="mt-10 h-[70px] w-full rounded-2xl bg-gradient-to-b from-[#FF6F73] to-[#FF4B4B] text-2xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}