// components/ResultFrame.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { Laptop, FilterValues } from '../types/types';

export default function ResultFrame() {
  const router = useRouter();
  const [results, setResults] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const filters = JSON.parse(router.query.filters as string) as FilterValues;
    
    fetch('/api/laptops')
      .then(res => res.json())
      .then(laptops => {
        const filteredLaptops = laptops.filter((laptop: Laptop) => {
          return (
            laptop.Price >= (filters.minPrice || 0) &&
            laptop.Price <= (filters.maxPrice || Infinity) &&
            (filters.Type ? laptop.Type === filters.Type : true) &&
            laptop.Rating >= (filters.Rating || 1) &&
            (filters.Touchscreen !== undefined ? laptop.Touchscreen === filters.Touchscreen : true)
          );
        });

        // Sort by match score
        const sortedLaptops = filteredLaptops.sort((a: Laptop, b: Laptop) => {
          const scoreA = calculateMatchScore(a, filters);
          const scoreB = calculateMatchScore(b, filters);
          return scoreB - scoreA;
        });

        setResults(sortedLaptops);
        setLoading(false);
      });
  }, [router.isReady, router.query]);

  const calculateMatchScore = (laptop: Laptop, filters: FilterValues): number => {
    let score = 0;
    
    // Price match
    const priceRange = filters.maxPrice! - filters.minPrice!;
    const priceDiff = Math.abs(laptop.Price - filters.minPrice!);
    score += (1 - priceDiff / priceRange) * 3;

    // Rating match
    if (laptop.Rating >= filters.Rating!) score += 2;

    // Type match
    if (filters.Type && laptop.Type === filters.Type) score += 3;

    // Touchscreen match
    if (filters.Touchscreen !== undefined && laptop.Touchscreen === filters.Touchscreen) score += 1;

    return score;
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Recommended Laptops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(laptop => (
          <div key={laptop.index} className="border rounded-lg p-4 shadow-sm">
            <Image
              src={`/images/laptops/laptop_${laptop.index}.jpg`}
              alt={laptop.Model}
              width={300}
              height={200}
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
      <button
        onClick={() => router.back()}
        className="mt-8 px-4 py-2 border rounded hover:bg-gray-100"
      >
        Back to Survey
      </button>
    </div>
  );
}