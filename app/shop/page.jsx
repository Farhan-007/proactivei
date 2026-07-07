"use client";

import React from 'react';
import Shop from '../../src/views/Shop';
import { useApp } from '../../src/context/AppContext';

export default function ShopPage() {
  const { products } = useApp();

  return (
    <Shop products={products} />
  );
}
