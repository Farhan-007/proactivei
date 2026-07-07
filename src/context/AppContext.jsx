"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialPrograms,
  initialEvents,
  initialArticles,
  initialResources,
  successStories,
  shopProducts,
  mediaItems
} from '../data/mockData';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  // Modal toggle states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [creatorMode, setCreatorMode] = useState(false);
  
  // Selected items states
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  // Dynamic CMS States
  const [programs, setPrograms] = useState(initialPrograms);
  const [events, setEvents] = useState(initialEvents);
  const [articles, setArticles] = useState(initialArticles);
  const [resources, setResources] = useState(initialResources);
  const [stories, setStories] = useState(successStories);
  const [products, setProducts] = useState(shopProducts);
  const [media, setMedia] = useState(mediaItems);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-light');
  }, []);

  const handleAddItem = (type, item) => {
    if (type === 'article') {
      setArticles(prev => [item, ...prev]);
    } else if (type === 'program') {
      setPrograms(prev => [item, ...prev]);
    } else if (type === 'event') {
      setEvents(prev => [item, ...prev]);
    } else if (type === 'resource') {
      setResources(prev => [item, ...prev]);
    }
  };

  const handleResetData = () => {
    if (window.confirm("Reset all published assets and restore original seed files?")) {
      setPrograms(initialPrograms);
      setEvents(initialEvents);
      setArticles(initialArticles);
      setResources(initialResources);
      setStories(successStories);
      setProducts(shopProducts);
      setMedia(mediaItems);
    }
  };

  const searchDataset = { programs, events, articles, resources };

  return (
    <AppContext.Provider value={{
      isSearchOpen, setIsSearchOpen,
      isBookingOpen, setIsBookingOpen,
      creatorMode, setCreatorMode,
      selectedItem, setSelectedItem,
      selectedBookingItem, setSelectedBookingItem,
      programs, setPrograms,
      events, setEvents,
      articles, setArticles,
      resources, setResources,
      stories, setStories,
      products, setProducts,
      media, setMedia,
      handleAddItem,
      handleResetData,
      searchDataset
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
}
