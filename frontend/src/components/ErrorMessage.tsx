import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
    <p className="font-bold">Error</p>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
