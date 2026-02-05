/**
 * Script to parse the Excel BOM file into JSON
 * Usage: npm run parse-bom
 */

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const BOM_FILE = path.join(__dirname, '..', 'BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'bom.json');

function parseBOM() {
  console.log('Reading BOM file:', BOM_FILE);

  // Read the Excel file
  const workbook = XLSX.readFile(BOM_FILE);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const data = XLSX.utils.sheet_to_json(worksheet);

  console.log(`Parsed ${data.length} items from BOM`);

  // Transform data to match our BOMItem type
  const transformedData = data.map((row, index) => ({
    id: `item-${index + 1}`,
    category: row['Category'] || 'Uncategorized',
    subcategory: row['Subcategory'] || null,
    item: row['Item'] || row['Description'] || 'Unknown',
    vendor: row['Vendor'] || 'Unknown',
    partNumber: row['Part Number'] || row['Part #'] || null,
    quantity: parseInt(row['Quantity'] || row['Qty'] || 1),
    unitPrice: parseFloat(row['Unit Price'] || row['Price'] || 0),
    totalPrice: parseFloat(row['Total Price'] || row['Total'] || 0),
    orderDate: row['Order Date'] || row['Date'] || null,
    received: row['Received'] === 'Yes' || row['Status'] === 'Received',
    notes: row['Notes'] || null,
    url: row['URL'] || row['Link'] || null,
  }));

  // Write to JSON file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformedData, null, 2));

  console.log(`BOM data written to ${OUTPUT_FILE}`);
  console.log(`Total items: ${transformedData.length}`);

  // Print summary statistics
  const totalCost = transformedData.reduce((sum, item) => sum + item.totalPrice, 0);
  const vendors = [...new Set(transformedData.map(item => item.vendor))];
  const categories = [...new Set(transformedData.map(item => item.category))];

  console.log('\nSummary:');
  console.log(`- Total cost: $${totalCost.toFixed(2)}`);
  console.log(`- Unique vendors: ${vendors.length}`);
  console.log(`- Categories: ${categories.length}`);
  console.log(`- Vendors: ${vendors.join(', ')}`);
}

try {
  parseBOM();
} catch (error) {
  console.error('Error parsing BOM:', error.message);
  process.exit(1);
}
