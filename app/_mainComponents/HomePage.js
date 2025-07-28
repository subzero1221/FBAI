'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import LiveMatches from './LiveMatches';
import Fixtures from './Fixtures';
import { useUserStore } from '@/app/store/userStore';
import { useHydrated } from '../utils/useHydrated';
import DateSelector from './DateSelector';
import dayjs from 'dayjs';


export default function HomePage() {
  const { language } = useUserStore(); 
  const [current, setCurrent] = useState(dayjs());
  const hydrated = useHydrated();
  const today = dayjs();

  if (!hydrated) return null;

  return (
    <div className="min-h-screen w-full" style={{ background: 'linear-gradient(to bottom, #111827, #374151)' }}>
      <Sidebar />
      
      <main className="container mx-auto px-4 py-6 ml-48">
        {/* Date selector */}
       <DateSelector current={current} setCurrent={setCurrent} />

        {/* Live Matches Section */}
       {current.isSame(today, 'day') && <LiveMatches />}

        {/* Fixtures Section */}
        <Fixtures current={current.format('YYYY-MM-DD')} today={today} />
      </main>
    </div>
  );
} 