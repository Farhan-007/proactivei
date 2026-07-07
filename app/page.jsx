"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Home from '../src/views/Home';
import { useApp } from '../src/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { programs, events, setSelectedBookingItem, setIsBookingOpen } = useApp();

  // Used by Home view's internal CTA buttons (e.g., "View All Programs")
  const handleSetCurrentPage = (pageId) => {
    router.push(pageId === 'home' ? '/' : `/${pageId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Home
      programs={programs}
      events={events}
      setCurrentPage={handleSetCurrentPage}
      setSelectedBookingItem={setSelectedBookingItem}
      setIsBookingOpen={setIsBookingOpen}
    />
  );
}
