// components/DialogBox.jsx
import React from 'react';

const DialogBox = ({ title, message, isOpen, onClose, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>

        <div className="flex justify-end gap-3">
          {onConfirm ? (
            <>
              <button
                onClick={onCancel}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Yes
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
