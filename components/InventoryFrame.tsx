// components/InventoryFrame.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import type { Laptop } from '../types/types';
import Navbar from './Navbar';

export default function InventoryFrame() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/laptops')
      .then(res => res.json())
      .then(data => {
        setLaptops(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Our Laptop Collection</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptops.map(laptop => (
              <div key={laptop.index} className="border rounded-lg p-4 shadow-sm">
                <Image
                  src={`/images/laptops/laptop${laptop.index || '1'}.jpg`}
                  alt={laptop.Model}
                  width={300}
                  height={200}
                  unoptimized
                  className="w-full object-cover mb-4"
                />
                <h2 className="font-bold text-lg">{laptop.Brand} {laptop.Model}</h2>
                <p className="text-gray-600">${laptop.Price}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {laptop.Type}
                  </span>
                  <span className="text-yellow-600">★ {laptop.Rating}/10</span>
                </div>
                <a
                  href={laptop.Hyperlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  View Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}