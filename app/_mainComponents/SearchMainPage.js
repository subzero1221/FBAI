'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { search } from '../actions/footballActions';
import SearchResults from './SearchResults';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => query ? search(query) : [],
    enabled: !!query,
  });

  if (!query) {
    return <div className="max-w-xl mx-auto mt-20 text-slate-400 text-center">Type something in the search bar and click Search.</div>;
  }

  if (isLoading) {
    return <div className="max-w-xl mx-auto mt-20 text-slate-400 text-center">Loading...</div>;
  }

  if(!isLoading && results.data.players?.length === 0 && results.data.countries?.length === 0 && results.data.teams?.length === 0) {
    return <div className="max-w-xl mx-auto mt-24 text-slate-400 text-center">No results found for &apos;{query}&apos;.</div>;
  }

  return <SearchResults results={results.data} query={query} />;
} 