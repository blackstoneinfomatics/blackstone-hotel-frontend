"use client";

import React, { useState } from "react";
import CustomPopup from "../../../../../../packages/popup/CustomPopup";

export default function TestPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Popup Demo</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => setShowSuccess(true)}
            className="w-full p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition"
          >
            ✅ Success (Green Button)
          </button>
          
          <button
            onClick={() => setShowDelete(true)}
            className="w-full p-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
          >
            🗑️ Delete (Red Button)
          </button>
          
          <button
            onClick={() => setShowLogout(true)}
            className="w-full p-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold transition"
          >
            🚪 Logout (Orange Button)
          </button>
        </div>
      </div>

      <CustomPopup
        isOpen={showSuccess}
        type="success"
        onClose={() => setShowSuccess(false)}
      />

      <CustomPopup
        isOpen={showDelete}
        type="delete"
        showCancel={true}
        onClose={() => setShowDelete(false)}
        onConfirm={() => {
          console.log("Deleted!");
          setShowDelete(false);
        }}
      />

      <CustomPopup
        isOpen={showLogout}
        type="logout"
        showCancel={true}
        onClose={() => setShowLogout(false)}
        onConfirm={() => {
          console.log("Logged out!");
          setShowLogout(false);
        }}
      />
    </div>
  );
}