import React from 'react';

function ModalFooter({ message, onClose, isSuccess }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="ml-3">
              <div className={`mt-2 text-xl ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${isSuccess ? 'bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500' : 'bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500'}`}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFooter;