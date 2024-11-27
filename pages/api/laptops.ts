// pages/api/laptops.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { Laptop } from '../../types/types';

// pages/api/laptops.ts
export default function handler(req: NextApiRequest, res: NextApiResponse<Laptop[]>) {
  try {
    const filePath = path.join(process.cwd(), 'public/data/database_cleaned.csv');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      cast: (value, context) => {
        // 强制数字类型转换
        if (context.column === 'Price' || 
            context.column === 'Rating' || 
            context.column === 'index') {
          return Number(value);
        }
        // 布尔值转换
        if (context.column === 'Touchscreen') {
          return value.toLowerCase() === 'true';
        }
        return value;
      }
    });
    
    res.status(200).json(records);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json([]);
  }
}