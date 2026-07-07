import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import BookingModal from './components/BookingModal';
import SimulatedCMS from './components/SimulatedCMS';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Events from './pages/Events';
import LearningHub from './pages/LearningHub';
import Resources from './pages/Resources';
import Community from './pages/Community';
import SuccessStories from './pages/SuccessStories';
import Media from './pages/Media';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

// Mock Seed Data
import {
  initialPrograms,
  initialEvents,
  initialArticles,
  initialResources,
  successStories,
  shopProducts,
  mediaItems
} from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [creatorMode, setCreatorMode] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-light');
  }, []);
  
  // Selection states
  const [selectedItem, setSelectedItem] = useState(null); // e.g. active reading article
  const [selectedBookingItem, setSelectedBookingItem] = useState(null);

  // Dynamic CMS States
  const [programs, setPrograms] = useState(initialPrograms);
  const [events, setEvents] = useState(initialEvents);
  const [articles, setArticles] = useState(initialArticles);
  const [resources, setResources] = useState(initialResources);
  const [stories, setStories] = useState(successStories);
  const [products, setProducts] = useState(shopProducts);
  const [media, setMedia] = useState(mediaItems);

  // Add Item handler from CMS
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

  // Reset handler to seed values
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

  // Combined dataset for search filtering
  const searchDataset = {
    programs,
    events,
    articles,
    resources
  };

  // Page Routing Render Switch
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            programs={programs}
            events={events}
            setCurrentPage={setCurrentPage}
            setSelectedBookingItem={setSelectedBookingItem}
            setIsBookingOpen={setIsBookingOpen}
          />
        );
      case 'about':
        return <About />;
      case 'programs':
        return (
          <Programs 
            programs={programs}
            setSelectedBookingItem={setSelectedBookingItem}
            setIsBookingOpen={setIsBookingOpen}
          />
        );
      case 'events':
        return (
          <Events 
            events={events}
            setSelectedBookingItem={setSelectedBookingItem}
            setIsBookingOpen={setIsBookingOpen}
          />
        );
      case 'learning-hub':
        return (
          <LearningHub 
            articles={articles}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        );
      case 'resources':
        return <Resources resources={resources} />;
      case 'community':
        return <Community />;
      case 'shop':
        return <Shop products={products} />;
      case 'success-stories':
        return <SuccessStories stories={stories} />;
      case 'media':
        return <Media media={media} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home programs={programs} events={events} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* 1. Global Navigation */}
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSearchClick={() => setIsSearchOpen(true)}
        creatorMode={creatorMode}
        setCreatorMode={setCreatorMode}
      />

      {/* 2. Main Page Content View Container */}
      <main style={{ flexGrow: 1 }}>
        {renderPage()}
      </main>

      {/* 3. Global Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* --- OVERLAY MODALS --- */}
      
      {/* Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={searchDataset}
        setCurrentPage={setCurrentPage}
        setSelectedItem={setSelectedItem}
      />

      {/* Workshop Registration and Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        bookingItem={selectedBookingItem}
      />

      {/* Simulated CMS Control Panel Drawer */}
      <SimulatedCMS 
        isOpen={creatorMode}
        onClose={() => setCreatorMode(false)}
        onAddItem={handleAddItem}
        onResetData={handleResetData}
      />

    </div>
  );
}
