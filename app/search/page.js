
import { Suspense } from 'react';
import SearchMainPage from '../_mainComponents/SearchMainPage';

export async function generateMetadata({ searchParams }) {
  const query = await searchParams.query;

  return {
    title: `FBAI / Search  - ${query}`,
    description: `Search results for ${query}`, 
  };
}

export default function SearchPage() {
  return <Suspense><SearchMainPage /></Suspense>;
} 