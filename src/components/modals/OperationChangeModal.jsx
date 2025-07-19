import React from "react";
import { operationNames, operationEmojis } from "../../utils/constants";

const OperationChangeModal = ({ show, currentOperation }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 text-center animate-bounce shadow-2xl max-w-sm border-4 border-purple-200">
        <div className="text-4xl sm:text-6xl mb-4">
          {operationEmojis[currentOperation]}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">
          New Challenge!
        </h2>
        <p className="text-base sm:text-lg text-gray-600">
          {operationNames[currentOperation]} Time!
        </p>
      </div>
    </div>
  );
};

export default OperationChangeModal;
