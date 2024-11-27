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
        if (context.column === 'index') return parseInt(value);
        return value;
      }
    });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error reading CSV:', error);
    res.status(500).json([]);
  }
}