"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";

// ============================================================================
// Types & Interfaces
// ============================================================================

export type PopupType =
  | "success"
  | "error"
  | "warning"
  | "save"
  | "delete"
  | "logout"
  | "info"
  | "confirmation"
  | "custom";

export type PopupSize = "sm" | "md" | "lg";

export type PopupColor =
  | "green"
  | "red"
  | "blue"
  | "orange"
  | "purple"
  | "gray";

export interface CustomPopupProps {
  isOpen: boolean;
  type?: PopupType;
  title?: string;
  description?: string;
  image?: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  showClose?: boolean;
  loading?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  maxWidth?: PopupSize;
  confirmColor?: PopupColor;
  onClose: () => void;
  onConfirm?: () => Promise<void> | void;
}

// ============================================================================
// Defaults
// ============================================================================

const DEFAULT_IMAGES: Record<PopupType, string> = {
  success: "/assests/success.svg.svg",
  save: "packages/popup/assets/save.svg.svg",
  warning: "packages/popup/assets/warning.svg.svg",
  delete: "packages/popup/assets/delete.svg.svg",
  logout: "packages/popup/assets/logout.svg.svg",
  error: "packages/popup/assets/error.svg.svg",
  info: "packages/popup/assets/info.svg.svg",
  confirmation: "packages/popup/assets/confirmation.svg.svg",
  custom: "packages/popup/assets/custom.svg.svg",
};

const DEFAULT_BUTTON_TEXT: Record<PopupType, string> = {
  success: "Done",
  save: "Save",
  warning: "Continue",
  delete: "Delete",
  logout: "Logout",
  error: "Retry",
  info: "OK",
  confirmation: "Confirm",
  custom: "Confirm",
};

const DEFAULT_TITLES: Record<PopupType, string> = {
  success: "Role Created Successfully!",
  save: "Save Changes?",
  warning: "Warning!",
  delete: "Delete Record?",
  logout: "Logout?",
  error: "Something Went Wrong",
  info: "Information",
  confirmation: "Confirm Action?",
  custom: "Custom Popup",
};

const DEFAULT_DESCRIPTIONS: Record<PopupType, string> = {
  success: "The new role has been created and is now active in the system.",
  save: "Do you want to save the changes you've made?",
  warning: "Please verify the entered details before proceeding.",
  delete: "This action cannot be undone. Are you sure?",
  logout: "You will be logged out of your account.",
  error: "Unable to complete your request. Please try again.",
  info: "Here's some information for you.",
  confirmation: "Please confirm that you want to proceed.",
  custom: "This is a custom popup.",
};

const BUTTON_COLORS: Record<PopupType, PopupColor> = {
  success: "green",
  save: "blue",
  warning: "orange",
  delete: "red",
  logout: "orange",
  error: "red",
  info: "blue",
  confirmation: "purple",
  custom: "blue",
};

// ============================================================================
// Main Component
// ============================================================================

export default function CustomPopup({
  isOpen,
  type = "success",
  title,
  description,
  image,
  confirmText,
  cancelText = "Cancel",
  showCancel = false,
  showClose = true,
  loading: externalLoading = false,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  maxWidth = "md",
  confirmColor,
  onClose,
  onConfirm,
}: CustomPopupProps) {
  // ==========================================================================
  // State
  // ==========================================================================

  const [internalLoading, setInternalLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const isLoading = externalLoading || internalLoading;

  // ==========================================================================
  // Derived Values
  // ==========================================================================

  const resolvedTitle = title || DEFAULT_TITLES[type] || "Popup";
  const resolvedDescription = description || DEFAULT_DESCRIPTIONS[type] || "";
  const resolvedImage = image || DEFAULT_IMAGES[type] || "";
  const resolvedConfirmText = confirmText || DEFAULT_BUTTON_TEXT[type] || "Confirm";
  const resolvedConfirmColor = confirmColor || BUTTON_COLORS[type] || "blue";

  // ==========================================================================
  // Get Gradient Colors
  // ==========================================================================

  const getGradientColors = (color: PopupColor) => {
    switch (color) {
      case "green":
        return "from-emerald-400 to-green-500";
      case "red":
        return "from-red-500 to-rose-500";
      case "blue":
        return "from-blue-500 to-indigo-500";
      case "orange":
        return "from-orange-400 to-amber-500";
      case "purple":
        return "from-violet-500 to-purple-500";
      case "gray":
        return "from-slate-500 to-gray-600";
      default:
        return "from-emerald-400 to-green-500";
    }
  };

  const gradientClass = getGradientColors(resolvedConfirmColor);

  // ==========================================================================
  // Effects
  // ==========================================================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && confirmButtonRef.current) {
      setTimeout(() => {
        confirmButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeOnEsc, isOpen, onClose]);

  // ==========================================================================
  // Handlers
  // ==========================================================================

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!closeOnOutsideClick) return;
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [closeOnOutsideClick, onClose]
  );

  const handleConfirm = useCallback(async () => {
    if (!onConfirm) {
      onClose();
      return;
    }

    if (typeof onConfirm !== "function") {
      console.error("CustomPopup: onConfirm must be a function");
      onClose();
      return;
    }

    if (isLoading) return;

    try {
      setInternalLoading(true);
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("CustomPopup Error:", error);
    } finally {
      setInternalLoading(false);
    }
  }, [onConfirm, isLoading, onClose]);

  // ==========================================================================
  // Render - FIXED: Correct width and height
  // ==========================================================================

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
      onClick={handleBackdropClick}
      aria-modal="true"
      role="dialog"
    >
      {/* Card - FIXED: Width 480px, proper padding */}
      <div
        ref={modalRef}
        className="relative w-[480px] max-w-[90vw] bg-white rounded-[32px] shadow-2xl"
        style={{
          animation: "fadeInZoom 0.3s ease-out",
        }}
      >
        {/* Close Button */}
        {showClose && (
          <button
            onClick={onClose}
            disabled={isLoading}
            aria-label="Close"
            className="absolute right-4 top-4 rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed z-10"
            type="button"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Content - FIXED: Proper spacing */}
        <div className="px-8 pt-10 pb-8 text-center">
          {/* Image */}
          {resolvedImage && !imageError && (
            <div className="mx-auto mb-6 flex justify-center">
              <div className="relative w-[200px] h-[160px]">
                <Image
                  src={resolvedImage}
                  alt={`${type} illustration`}
                  fill
                  className="object-contain"
                  priority
                  onError={() => {
                    setImageError(true);
                    console.warn(`Failed to load image: ${resolvedImage}`);
                  }}
                />
              </div>
            </div>
          )}

          {/* Fallback emoji */}
          {imageError && (
            <div className="mx-auto mb-6 flex justify-center text-6xl">
              {type === "success" && "✅"}
              {type === "error" && "❌"}
              {type === "warning" && "⚠️"}
              {type === "delete" && "🗑️"}
              {type === "logout" && "🚪"}
              {type === "save" && "💾"}
              {type === "info" && "ℹ️"}
              {type === "confirmation" && "❓"}
              {type === "custom" && "🎨"}
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">
            {resolvedTitle}
          </h2>

          {/* Description */}
          {resolvedDescription && (
            <p className="text-[15px] text-[#6b7280] leading-relaxed">
              {resolvedDescription}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            {/* Confirm Button */}
            <button
              ref={confirmButtonRef}
              onClick={handleConfirm}
              disabled={isLoading}
              className={`
                w-full h-[52px] rounded-2xl 
                bg-gradient-to-r ${gradientClass}
                text-base font-semibold text-white 
                transition-all duration-200 
                hover:scale-[1.02] hover:shadow-lg
                active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center
                shadow-md
              `}
              style={{
                backgroundImage: resolvedConfirmColor === "green" 
                  ? "linear-gradient(to right, #34d399, #22c55e)"
                  : resolvedConfirmColor === "red"
                  ? "linear-gradient(to right, #ef4444, #f43f5e)"
                  : resolvedConfirmColor === "blue"
                  ? "linear-gradient(to right, #3b82f6, #6366f1)"
                  : resolvedConfirmColor === "orange"
                  ? "linear-gradient(to right, #fb923c, #f59e0b)"
                  : resolvedConfirmColor === "purple"
                  ? "linear-gradient(to right, #8b5cf6, #a855f7)"
                  : "linear-gradient(to right, #34d399, #22c55e)",
              }}
              type="button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                resolvedConfirmText
              )}
            </button>

            {/* Cancel Button */}
            {showCancel && (
              <button
                onClick={onClose}
                disabled={isLoading}
                className="
                  w-full h-[52px] rounded-2xl
                  bg-gray-100 
                  text-base font-semibold text-gray-700 
                  transition-all duration-200 
                  hover:bg-gray-200 hover:scale-[1.02]
                  active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                "
                type="button"
              >
                {cancelText}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeInZoom {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}