"use client";

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import SearchModal from './SearchModal';
import BookingModal from './BookingModal';
import SimulatedCMS from './SimulatedCMS';
import { useApp } from '../context/AppContext';

export default function GlobalLayoutShell({ children }) {
  const {
    isSearchOpen, setIsSearchOpen,
    isBookingOpen, setIsBookingOpen,
    creatorMode, setCreatorMode,
    selectedBookingItem,
    searchDataset,
    handleAddItem,
    handleResetData,
    setSelectedItem
  } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        onSearchClick={() => setIsSearchOpen(true)}
        creatorMode={creatorMode}
        setCreatorMode={setCreatorMode}
      />
      <main style={{ flexGrow: 1 }}>
        {children}
      </main>
      <Footer />

      {/* Persistent Overlay Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={searchDataset}
        setSelectedItem={setSelectedItem}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingItem={selectedBookingItem}
      />
      {/* <SimulatedCMS 
        isOpen={creatorMode}
        onClose={() => setCreatorMode(false)}
        onAddItem={handleAddItem}
        onResetData={handleResetData}
      /> */}
    </div>
  );
}
