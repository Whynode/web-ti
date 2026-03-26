"use client";
import React from 'react';
import dynamic from 'next/dynamic';

import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => (
    <div className="h-64 w-full bg-slate-50 animate-pulse border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-500 font-medium">
      <svg className="animate-spin h-8 w-8 mb-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      <span>Mempersiapkan Rich Text Editor...</span>
    </div>
  ) 
});

export default function RichEditor({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  return (
    <div className="bg-white text-black rounded-lg">
      <QuillEditor theme="snow" value={value || ''} onChange={onChange} />
    </div>
  );
}