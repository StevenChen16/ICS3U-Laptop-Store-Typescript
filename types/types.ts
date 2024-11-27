// types/types.ts
export interface Laptop {
  index: number;
  Brand: string;
  Rating: number;
  Model: string;
  Type: string;
  Price: number;
  'CPU - Brand': string;
  'Model - CPU': string;
  'Cores - CPU': number;
  'Speed (GHz)': number;
  'Speed Rating': number;
  'RAM - GB': number;
  'SSD (GB)': number;
  'Storage (1-10)': number;
  'GPU brand': string;
  'GPU model': string;
  'USB ports': number;
  'other ports': string;
  OS: string;
  'Disp. (in)': number;
  Display: string;
  Touchscreen: boolean;
  'Weight (lbs)': number;
  Hyperlink: string;
}

export interface FilterValues {
  minPrice?: number;
  maxPrice?: number;
  Brand?: string;
  Type?: string;
  'CPU - Brand'?: string;
  'GPU brand'?: string;
  OS?: string;
  'RAM - GB'?: string;
  'SSD (GB)'?: string;
  Rating?: number;
  'Speed Rating'?: number;
  'USB ports'?: string;
  'other ports'?: string;
  'Disp. (in)'?: string;
  'Weight (lbs)'?: string;
  Touchscreen?: boolean;
}