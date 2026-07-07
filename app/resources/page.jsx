"use client";

import React from 'react';
import Resources from '../../src/views/Resources';
import { useApp } from '../../src/context/AppContext';

export default function ResourcesPage() {
  const { resources } = useApp();

  return (
    <Resources resources={resources} />
  );
}
