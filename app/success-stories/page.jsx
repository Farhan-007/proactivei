"use client";

import React from 'react';
import SuccessStories from '../../src/views/SuccessStories';
import { useApp } from '../../src/context/AppContext';

export default function SuccessStoriesPage() {
  const { stories } = useApp();

  return (
    <SuccessStories stories={stories} />
  );
}
