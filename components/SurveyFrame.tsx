import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { Laptop, FilterValues } from '../types/types';
import Navbar from './Navbar';

export default function SurveyFrame() {
  const router = useRouter();
  const [options, setOptions] = useState<Record<string, Set<string>>>({});
  const [filters, setFilters] = useState<FilterValues>({
    minPrice: 0,
    maxPrice: 2000,
    Rating: 1,
    'Speed Rating': 1,
    Touchscreen: false
  });

  useEffect(() => {
    fetch('/api/laptops')
      .then(res => res.json())
      .then(laptops => {
        const newOptions: Record<string, Set<string>> = {};
        laptops.forEach((laptop: Laptop) => {
          Object.entries(laptop).forEach(([key, value]) => {
            if (!newOptions[key]) newOptions[key] = new Set();
            newOptions[key].add(String(value));
          });
        });
        setOptions(newOptions);
      });
  }, []);

  const handleSubmit = () => {
    router.push({
      pathname: '/results',
      query: { filters: JSON.stringify(filters) }
    });
  };

  return (
    <div>
      <Navbar />
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Find Your Perfect Laptop</h1>
          
          <div className="space-y-6">
            {/* Price Range */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Price Range</h2>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block mb-2">Min Price ($)</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block mb-2">Max Price ($)</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Brand</h2>
              <select
                value={filters.Brand || ''}
                onChange={(e) => setFilters({...filters, Brand: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                {Array.from(options.Brand || []).map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Type</h2>
              <select
                value={filters.Type || ''}
                onChange={(e) => setFilters({...filters, Type: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                {Array.from(options.Type || []).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* CPU */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">CPU</h2>
              <select
                value={filters['CPU - Brand'] || ''}
                onChange={(e) => setFilters({...filters, 'CPU - Brand': e.target.value})}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Any CPU Brand</option>
                {Array.from(options['CPU - Brand'] || []).map(cpu => (
                  <option key={cpu} value={cpu}>{cpu}</option>
                ))}
              </select>
            </div>

            {/* GPU */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">GPU</h2>
              <select
                value={filters['GPU brand'] || ''}
                onChange={(e) => setFilters({...filters, 'GPU brand': e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Any GPU Brand</option>
                {Array.from(options['GPU brand'] || []).map(gpu => (
                  <option key={gpu} value={gpu}>{gpu}</option>
                ))}
              </select>
            </div>

            {/* RAM & Storage */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Memory & Storage</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">RAM (GB)</label>
                  <select
                    value={filters['RAM - GB'] || ''}
                    onChange={(e) => setFilters({...filters, 'RAM - GB': e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Any</option>
                    {Array.from(options['RAM - GB'] || []).sort((a, b) => Number(a) - Number(b)).map(ram => (
                      <option key={ram} value={ram}>{ram}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Storage (GB)</label>
                  <select
                    value={filters['SSD (GB)'] || ''}
                    onChange={(e) => setFilters({...filters, 'SSD (GB)': e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Any</option>
                    {Array.from(options['SSD (GB)'] || []).sort((a, b) => Number(a) - Number(b)).map(storage => (
                      <option key={storage} value={storage}>{storage}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Display */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Display</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">Size (inches)</label>
                  <select
                    value={filters['Disp. (in)'] || ''}
                    onChange={(e) => setFilters({...filters, 'Disp. (in)': e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Any</option>
                    {Array.from(options['Disp. (in)'] || []).sort((a, b) => Number(a) - Number(b)).map(size => (
                      <option key={size} value={size}>{size}"</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2">Touchscreen</label>
                  <div className="flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={filters.Touchscreen}
                      onChange={(e) => setFilters({...filters, Touchscreen: e.target.checked})}
                      className="mr-2"
                    />
                    <span>Required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Sliders */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-semibold mb-3">Ratings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Minimum Rating (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={filters.Rating}
                    onChange={(e) => setFilters({...filters, Rating: Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-center">{filters.Rating}</div>
                </div>
                <div>
                  <label className="block mb-2">Minimum Speed Rating (1-10)</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={filters['Speed Rating']}
                    onChange={(e) => setFilters({...filters, 'Speed Rating': Number(e.target.value)})}
                    className="w-full"
                  />
                  <div className="text-center">{filters['Speed Rating']}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => router.back()}
                className="px-6 py-2 border rounded hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Find Laptops
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}