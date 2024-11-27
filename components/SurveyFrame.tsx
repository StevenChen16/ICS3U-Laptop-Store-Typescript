// components/SurveyFrame.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import type { FilterValues } from '../types/types';

export default function SurveyFrame() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterValues>({
    minPrice: 0,
    maxPrice: 2000,
    Rating: 1,
    'Speed Rating': 1,
    Touchscreen: false
  });

  const handleSubmit = () => {
    router.push({
      pathname: '/results',
      query: { filters: JSON.stringify(filters) }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Find Your Perfect Laptop</h1>
      
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block mb-2">Minimum Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-2">Maximum Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Rating (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={filters.Rating}
            onChange={(e) => setFilters({...filters, Rating: Number(e.target.value)})}
            className="w-full"
          />
        </div>

        <div>
          <label className="block mb-2">Type</label>
          <select
            value={filters.Type || ''}
            onChange={(e) => setFilters({...filters, Type: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Any</option>
            <option value="Student">Student</option>
            <option value="Professional">Professional</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.Touchscreen}
            onChange={(e) => setFilters({...filters, Touchscreen: e.target.checked})}
          />
          <label>Touchscreen</label>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Find Laptops
          </button>
        </div>
      </div>
    </div>
  );
}

