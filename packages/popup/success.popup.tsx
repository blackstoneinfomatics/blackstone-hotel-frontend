"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface SuccessPopupProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  onClose: () => void;
  onDone?: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({
  isOpen,
  title = "Role Created Successfully!",
  description = "The new role has been created and is now active in the system.",
  buttonText = "Done",
  imageSrc = "/images/success-popup.png",
  closeOnOutsideClick = true,
  closeOnEsc = true,
  onClose,
  onDone,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Don't render when closed
  if (!isOpen) return null;

  /**
   * Validate required props
   */
  useEffect(() => {
    if (typeof onClose !== "function") {
      console.error(
        "SuccessPopup Error: onClose prop is required and must be a function."
      );
    }
  }, [onClose]);

  /**
   * Disable background scrolling
   */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  /**
   * ESC key handling
   */
  useEffect(() => {
    if (!closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeOnEsc, onClose]);

  /**
   * Outside click
   */
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!closeOnOutsideClick) return;

    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  /**
   * Done Button
   */
  const handleDone = () => {
    try {
      if (onDone) {
        onDone();
      } else {
        onClose();
      }
    } catch (error) {
      console.error("SuccessPopup Error:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-300"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Content */}
        <div className="px-8 py-10 text-center">

          <div className="mx-auto mb-8 flex justify-center">
            <Image
              src={imageSrc}
              alt="Success"
              width={220}
              height={170}
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            {description}
          </p>

          <button
            onClick={handleDone}
            className="mt-10 h-14 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-lg font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-95"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;