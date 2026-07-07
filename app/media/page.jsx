"use client";

import React from 'react';
import Media from '../../src/views/Media';
import { useApp } from '../../src/context/AppContext';

export default function MediaPage() {
  const { media } = useApp();

  return (
    <Media media={media} />
  );
}
