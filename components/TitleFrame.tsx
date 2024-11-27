// components/TitleFrame.tsx
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TitleFrame() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Image 
        src="/images/logo.png" 
        alt="Store Logo" 
        width={400} 
        height={200}
        className="mb-12"
      />
      <div className="space-y-4 w-64">
        <button
          onClick={() => router.push('/survey')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
        >
          Find Your Laptop
        </button>
        <button
          onClick={() => router.push('/inventory')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold"
        >
          View All Laptops
        </button>
      </div>
    </div>
  );
}