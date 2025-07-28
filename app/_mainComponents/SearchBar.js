'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ placeholder }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className="relative w-full max-w-xl mx-auto flex" onSubmit={handleSearch}>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder || 'Search...'}
        className="w-full px-5 py-3 pl-12 rounded-l-xl bg-slate-800/60 border border-slate-600/40 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-400/60 focus:bg-slate-800/80 transition-all duration-300 backdrop-blur-sm"
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-r-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
        disabled={!query.trim()}
      >
        Search
      </button>
      {/* Search icon */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </form>
  );
} 