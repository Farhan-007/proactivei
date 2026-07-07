"use client";

import React from 'react';
import Events from '../../src/views/Events';
import { useApp } from '../../src/context/AppContext';

export default function EventsPage() {
  const { events, setSelectedBookingItem, setIsBookingOpen } = useApp();

  return (
    <Events 
      events={events}
      setSelectedBookingItem={setSelectedBookingItem}
      setIsBookingOpen={setIsBookingOpen}
    />
  );
}
