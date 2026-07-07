"use client";

import React from 'react';
import LearningHub from '../../src/views/LearningHub';
import { useApp } from '../../src/context/AppContext';

export default function LearningHubPage() {
  const { articles, selectedItem, setSelectedItem } = useApp();

  return (
    <LearningHub 
      articles={articles}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  );
}
