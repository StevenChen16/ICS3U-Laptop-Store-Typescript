import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { Laptop, FilterValues } from '../types/types';
import Navbar from './Navbar';

export default function ResultFrame() {
  const router = useRouter();
  const [results, setResults] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>();

  const calculateMatchScore = (laptop: Laptop, filters: FilterValues): number => {
    let score = 0;
    if (laptop.Price >= filters.minPrice! && laptop.Price <= filters.maxPrice!) {
      score += 3 * (1 - (laptop.Price - filters.minPrice!) / (filters.maxPrice! - filters.minPrice!));
    }
    if (laptop.Rating >= filters.Rating!) score += 2;
    if (!filters.Type || laptop.Type === filters.Type) score += 2;
    if (filters.Touchscreen === undefined || laptop.Touchscreen === filters.Touchscreen) score += 1;
    return score;
  };

  useEffect(() => {
    if (!router.isReady) return;
    
    try {
      const parsedFilters = JSON.parse(router.query.filters as string || '{}') as FilterValues;
      setFilters(parsedFilters);
      
      fetch('/api/laptops')
        .then(res => res.json())
        .then(laptops => {
          const scoredLaptops = laptops.map((laptop: Laptop) => ({
            ...laptop,
            matchScore: calculateMatchScore(laptop, parsedFilters)
          }));
          
          const sortedLaptops = scoredLaptops.sort((a, b) => b.matchScore - a.matchScore);
          console.log('Filtered laptops:', sortedLaptops);
          setResults(sortedLaptops);
          setLoading(false);
        })
        .catch(error => {
          console.error('Fetch error:', error);
          setLoading(false);
        });
    } catch (error) {
      console.error('Parse error:', error);
      setLoading(false);
    }
  }, [router.isReady, router.query.filters]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (!filters) return <div className="text-center p-8">No filter criteria found</div>;

  return (
    <div>
      <Navbar />
        <div className="container mx-auto p-6">
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold mb-2">Search Criteria</h2>
            <div className="grid grid-cols-2 gap-4">
              <p>Price Range: ${filters.minPrice} - ${filters.maxPrice}</p>
              <p>Minimum Rating: {filters.Rating}/10</p>
              <p>Type: {filters.Type || 'Any'}</p>
              <p>Touchscreen: {filters.Touchscreen ? 'Yes' : 'No'}</p>
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6">Recommended Laptops ({results.length})</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(laptop => (
              <div key={laptop.index} className="border rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative h-48 mb-4">
                  <Image
                    src={`/images/laptops/laptop${laptop.index}.jpg`}
                    alt={`${laptop.Brand} ${laptop.Model}`}
                    fill
                    unoptimized
                    className="object-cover rounded"
                  />
                </div>
                <h2 className="font-bold text-lg">{laptop.Brand} {laptop.Model}</h2>
                <p className="text-gray-600">
                  ${typeof laptop.Price === 'string' ? parseFloat(laptop.Price).toFixed(2) : laptop.Price.toFixed(2)}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {laptop.Type}
                  </span>
                  <span className="text-yellow-600">★ {laptop.Rating}/10</span>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Match Score: {typeof laptop.matchScore === 'number' ? laptop.matchScore.toFixed(1) : 'N/A'}
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
      </div>
  );
}