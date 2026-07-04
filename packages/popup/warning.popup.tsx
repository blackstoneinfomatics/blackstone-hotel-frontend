"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ErrorPopupProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;

  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;

  loading?: boolean;

  onClose: () => void;
  onContinue: () => Promise<void> | void;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  isOpen,
  title = "Are You Sure?",
  description = "This action may affect existing data.",
  buttonText = "Continue",
  imageSrc = "/images/error-popup.png",

  closeOnOutsideClick = true,
  closeOnEsc = true,

  loading = false,

  onClose,
  onContinue,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [processing, setProcessing] = useState(false);

  /**
   * Validate Required Props
   */
  useEffect(() => {
    if (typeof onClose !== "function") {
      console.error("ErrorPopup: 'onClose' must be a function.");
    }

    if (typeof onContinue !== "function") {
      console.error("ErrorPopup: 'onContinue' must be a function.");
    }
  }, [onClose, onContinue]);

  /**
   * Lock Background Scroll
   */
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * ESC Key Support
   */
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        !processing &&
        !loading
      ) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () =>
      window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, processing, loading, onClose]);

  /**
   * Close on Outside Click
   */
  const handleBackdropClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (!closeOnOutsideClick) return;

    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !processing &&
      !loading
    ) {
      onClose();
    }
  };

  /**
   * Continue Action
   */
  const handleContinue = async () => {
    try {
      setProcessing(true);

      await Promise.resolve(onContinue());

      onClose();
    } catch (error) {
      console.error("ErrorPopup Action Failed:", error);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-[28px] bg-white shadow-2xl animate-in zoom-in-95 duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={processing || loading}
          aria-label="Close Popup"
          className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="px-8 py-10 text-center">

          <div className="mb-8 flex justify-center">
            <Image
              src={imageSrc}
              alt="Warning"
              width={220}
              height={180}
              priority
            />
          </div>

          <h2 className="text-4xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="mt-5 text-gray-500 leading-7">
            {description}
          </p>

          <button
            onClick={handleContinue}
            disabled={processing || loading}
            className="mt-10 h-14 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {processing || loading
              ? "Processing..."
              : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;