import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

interface BOMItem {
  id: string;
  name: string;
  description: string;
  vendor: string;
  partNumber: string;
  vendorUrl?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  category: string;
  buildPhase: 1 | 2 | 3 | 4;
  orderDate?: string;
  notes?: string;
}

interface Summary {
  totalItems: number;
  totalCost: number;
  costByPhase: Record<string, number>;
  costByVendor: Record<string, number>;
  itemsByCategory: Record<string, number>;
}

function parseExcelToBOM(): void {
  const excelPath = path.join(__dirname, '..', 'BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx');
  const outputPath = path.join(__dirname, '..', 'data', 'bom.json');

  console.log('📊 Parsing BOM Excel file...');
  console.log(`Input: ${excelPath}`);

  // Read the Excel file
  const workbook = XLSX.readFile(excelPath);

  // Get the first sheet
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  console.log(`Sheet name: ${firstSheetName}`);

  // Convert to JSON
  const rawData: any[] = XLSX.utils.sheet_to_json(worksheet, {
    raw: false,
    defval: ''
  });

  console.log(`\n📋 Found ${rawData.length} rows in Excel file`);

  // Map Excel columns to BOMItem interface
  const bomItems: BOMItem[] = [];
  let skippedRows = 0;

  rawData.forEach((row, index) => {
    try {
      // Try to detect column names (flexible mapping)
      const name = row['Part Name'] || row['Name'] || row['Item'] || row['Component'] || '';
      const description = row['Description'] || row['Details'] || row['Desc'] || '';
      const vendor = row['Vendor'] || row['Supplier'] || row['Source'] || '';
      const partNumber = row['Part Number'] || row['Part #'] || row['PartNumber'] || row['SKU'] || '';
      const quantity = parseInt(row['Quantity'] || row['Qty'] || row['Count'] || '1');
      const unitPrice = parseFloat((row['Unit Price'] || row['Price'] || row['Unit Cost'] || '0').toString().replace(/[$,]/g, ''));
      const category = row['Category'] || row['Type'] || row['Class'] || 'Misc';
      const buildPhase = parseInt(row['Build Phase'] || row['Phase'] || row['Stage'] || '1') as 1 | 2 | 3 | 4;
      const orderDate = row['Order Date'] || row['Date'] || undefined;
      const notes = row['Notes'] || row['Comments'] || undefined;
      const vendorUrl = row['Vendor URL'] || row['URL'] || row['Link'] || undefined;

      // Skip rows with no name or vendor
      if (!name || !vendor) {
        skippedRows++;
        return;
      }

      const totalPrice = quantity * unitPrice;

      bomItems.push({
        id: `bom-${String(bomItems.length + 1).padStart(3, '0')}`,
        name: name.trim(),
        description: description.trim(),
        vendor: vendor.trim(),
        partNumber: partNumber.toString().trim(),
        vendorUrl: vendorUrl?.trim(),
        quantity: isNaN(quantity) ? 1 : quantity,
        unitPrice: isNaN(unitPrice) ? 0 : unitPrice,
        totalPrice: isNaN(totalPrice) ? 0 : totalPrice,
        category: category.trim(),
        buildPhase: [1, 2, 3, 4].includes(buildPhase) ? buildPhase : 1,
        orderDate: orderDate ? formatDate(orderDate) : undefined,
        notes: notes?.trim(),
      });
    } catch (error) {
      console.warn(`⚠️  Error parsing row ${index + 1}:`, error);
      skippedRows++;
    }
  });

  // Sort by buildPhase, then by vendor
  bomItems.sort((a, b) => {
    if (a.buildPhase !== b.buildPhase) {
      return a.buildPhase - b.buildPhase;
    }
    return a.vendor.localeCompare(b.vendor);
  });

  // Calculate summary statistics
  const summary: Summary = {
    totalItems: bomItems.length,
    totalCost: 0,
    costByPhase: {},
    costByVendor: {},
    itemsByCategory: {},
  };

  bomItems.forEach(item => {
    summary.totalCost += item.totalPrice;

    // Cost by phase
    const phase = `Phase ${item.buildPhase}`;
    summary.costByPhase[phase] = (summary.costByPhase[phase] || 0) + item.totalPrice;

    // Cost by vendor
    summary.costByVendor[item.vendor] = (summary.costByVendor[item.vendor] || 0) + item.totalPrice;

    // Items by category
    summary.itemsByCategory[item.category] = (summary.itemsByCategory[item.category] || 0) + 1;
  });

  // Write to JSON file
  const output = {
    metadata: {
      generatedAt: new Date().toISOString(),
      sourceFile: 'BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx',
      totalItems: summary.totalItems,
      totalCost: summary.totalCost,
    },
    summary,
    items: bomItems,
  };

  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

  // Print summary
  console.log('\n✅ BOM Parsing Complete!\n');
  console.log('📊 SUMMARY:');
  console.log(`   Total Items: ${summary.totalItems}`);
  console.log(`   Skipped Rows: ${skippedRows}`);
  console.log(`   Total Cost: $${summary.totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);

  console.log('\n💰 COST BY PHASE:');
  Object.entries(summary.costByPhase)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([phase, cost]) => {
      console.log(`   ${phase}: $${cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
    });

  console.log('\n🏢 COST BY VENDOR (Top 10):');
  Object.entries(summary.costByVendor)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([vendor, cost]) => {
      console.log(`   ${vendor}: $${cost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
    });

  console.log('\n📦 ITEMS BY CATEGORY:');
  Object.entries(summary.itemsByCategory)
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`   ${category}: ${count}`);
    });

  console.log(`\n📁 Output saved to: ${outputPath}\n`);
}

function formatDate(dateValue: any): string | undefined {
  if (!dateValue) return undefined;

  try {
    // Handle Excel date serial numbers
    if (typeof dateValue === 'number') {
      const date = XLSX.SSF.parse_date_code(dateValue);
      return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
    }

    // Handle string dates
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date.toISOString().split('T')[0];
    }
  } catch (error) {
    console.warn('Error parsing date:', dateValue);
  }

  return undefined;
}

// Run the parser
parseExcelToBOM();
