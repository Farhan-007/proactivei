"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Home from '../src/views/Home';
import { useApp } from '../src/context/AppContext';

export default function HomePage() {
  const router = useRouter();
  const { programs, events, setSelectedBookingItem, setIsBookingOpen } = useApp();

  const handleSetCurrentPage = (pageId) => {
    router.push(pageId === 'home' ? '/' : `/${pageId}`);
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
