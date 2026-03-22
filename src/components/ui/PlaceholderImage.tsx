import React from "react";
import { ImageIcon } from "lucide-react";

interface PlaceholderImageProps {
  className?: string;
  label?: string;
}

export default function PlaceholderImage({ className = "", label = "Durung Ana Gambar" }: PlaceholderImageProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${className}`}>
      <ImageIcon className="w-12 h-12 text-gray-300 mb-2" />
      <span className="text-xs text-gray-400 font-medium text-center px-2">{label}</span>
    </div>
  );
}
