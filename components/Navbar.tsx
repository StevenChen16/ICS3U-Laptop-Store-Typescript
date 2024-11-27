// components/Navbar.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/images/logo.png" 
            alt="DCS Logo" 
            width={40} 
            height={40}
          />
          <span className="text-xl font-bold text-gray-800">DCS Computer</span>
        </Link>
      </div>
    </nav>
  );
}