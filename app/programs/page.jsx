"use client";

import React from 'react';
import Programs from '../../src/views/Programs';
import { useApp } from '../../src/context/AppContext';

export default function ProgramsPage() {
  const { programs, setSelectedBookingItem, setIsBookingOpen } = useApp();

  return (
    <Programs 
      programs={programs}
      setSelectedBookingItem={setSelectedBookingItem}
      setIsBookingOpen={setIsBookingOpen}
    />
  );
}
