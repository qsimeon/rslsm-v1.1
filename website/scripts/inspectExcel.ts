import * as XLSX from 'xlsx';
import * as path from 'path';

const excelPath = path.join(__dirname, '..', '..', 'BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx');

console.log('📊 Inspecting Excel file...');
console.log(`File: ${excelPath}\n`);

const workbook = XLSX.readFile(excelPath);
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

console.log(`Sheet name: ${firstSheetName}\n`);

// Get raw data to inspect structure
const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
  raw: false,
  defval: ''
});

console.log(`Total rows: ${rawData.length}\n`);

// Show first 3 rows to understand structure
console.log('First 3 rows:');
rawData.slice(0, 3).forEach((row, i) => {
  console.log(`\nRow ${i + 1}:`);
  console.log(JSON.stringify(row, null, 2));
});

// Show all unique column names
console.log('\n\nAll column names found:');
const allColumns = new Set<string>();
rawData.forEach(row => {
  Object.keys(row).forEach(key => allColumns.add(key));
});
console.log(Array.from(allColumns).sort());
