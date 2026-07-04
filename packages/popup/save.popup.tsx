"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface SavePopupProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttonText?: string;
  imageSrc?: string;
  closeOnOutsideClick?: boolean;
  closeOnEsc?: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSave: () => Promise<void> | void;
}

const SavePopup: React.FC<SavePopupProps> = ({
  isOpen,
  title = "Save Changes ?",
  description = "Your modifications are ready to be saved.",
  buttonText = "Save",
  imageSrc = "/images/save-popup.png",
  closeOnOutsideClick = true,
  closeOnEsc = true,
  isLoading = false,
  onClose,
  onSave,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [saving, setSaving] = useState(false);

  /**
   * Validate required props
   */
  useEffect(() => {
    if (typeof onClose !== "function") {
      console.error("SavePopup: 'onClose' must be a function.");
    }

    if (typeof onSave !== "function") {
      console.error("SavePopup: 'onSave' must be a function.");
    }
  }, [onClose, onSave]);

  /**
   * Prevent body scroll
   */
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /**
   * ESC key close
   */
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving && !isLoading) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, closeOnEsc, saving, isLoading, onClose]);

  /**
   * Outside click
   */
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!closeOnOutsideClick) return;

    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node) &&
      !saving &&
      !isLoading
    ) {
      onClose();
    }
  };

  /**
   * Save Handler
   */
  const handleSave = async () => {
    try {
      setSaving(true);

      await Promise.resolve(onSave());

      onClose();
    } catch (error) {
      console.error("Save Failed:", error);
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md rounded-[28px] bg-white shadow-2xl animate-in zoom-in-95 duration-200"
      >
        {/* Close */}
        <button
          onClick={onClose}
          disabled={saving || isLoading}
          className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed"
          aria-label="Close Popup"
        >
          <X size={22} />
        </button>

        {/* Body */}
        <div className="px-8 py-10 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src={imageSrc}
              alt="Save"
              width={200}
              height={170}
              priority
            />
          </div>

          <h2 className="text-4xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="mt-5 text-[16px] leading-7 text-gray-500">
            {description}
          </p>

          <button
            onClick={handleSave}
            disabled={saving || isLoading}
            className="mt-10 h-14 w-full rounded-xl bg-gradient-to-r from-emerald-400 to-green-500 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving || isLoading ? "Saving..." : buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavePopup;