import Link from "next/link";
import React from "react";
interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex flex-col gap-5 items-center">
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
      <p className="font-bold">Error</p>
      <p>{message}</p>
    </div>
    <button className="mt-4 bg-gray-200 border text-sm max-w-[100px] dark:text-black text-white border-primary text-primary py-2 px-4 rounded-xl">
      <Link href="/">Return</Link>
    </button>
  </div>
);

export default ErrorMessage;
