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
  subassembly?: string;
}

interface Summary {
  totalItems: number;
  totalCost: number;
  costByPhase: Record<string, number>;
  costByVendor: Record<string, number>;
  itemsByCategory: Record<string, number>;
  itemsBySubassembly: Record<string, number>;
}

// Map subassembly names to build phases
function getPhaseFromSubassembly(subassm: string): 1 | 2 | 3 | 4 {
  const lower = subassm.toLowerCase();

  // Phase 1: Sample handling, mechanical basics
  if (lower.includes('sample') || lower.includes('mount')) return 1;

  // Phase 2: Illumination
  if (lower.includes('illumination') || lower.includes('light') || lower.includes('led')) return 2;

  // Phase 3: Imaging optics
  if (lower.includes('imaging') || lower.includes('detection') || lower.includes('camera')) return 3;

  // Phase 4: Electronics, integration
  if (lower.includes('electronics') || lower.includes('computer') || lower.includes('cable')) return 4;

  // Default
  return 1;
}

// Categorize parts based on subassembly and vendor
function categorizePart(subassm: string, vendor: string, partNum: string): string {
  const lower = subassm.toLowerCase();
  const vLower = vendor.toLowerCase();
  const pLower = partNum.toLowerCase();

  // Electronics
  if (vLower.includes('digi') || vLower.includes('arduino') || vLower.includes('adafruit') ||
      pLower.includes('cable') || pLower.includes('wire') || pLower.includes('pcb')) {
    return 'Electronics';
  }

  // Optics
  if (vLower.includes('thor') || vLower.includes('edmund') || vLower.includes('newport') ||
      vLower.includes('semrock') || vLower.includes('chroma') || vLower.includes('spach') ||
      lower.includes('illumination') || lower.includes('imaging') || lower.includes('detection') ||
      pLower.includes('lens') || pLower.includes('mirror') || pLower.includes('filter')) {
    return 'Optics';
  }

  // Mechanics
  if (vLower.includes('mcmaster') || vLower.includes('misumi') ||
      pLower.includes('screw') || pLower.includes('bracket') || pLower.includes('mount') ||
      pLower.includes('post') || pLower.includes('plate')) {
    return 'Mechanics';
  }

  // Custom/3D Printed
  if (vLower.includes('custom') || vLower.includes('xometry') ||
      vLower.includes('3dp') || pLower.includes('3dp')) {
    return 'Custom Parts';
  }

  // Sample handling
  if (lower.includes('sample')) {
    return 'Sample Handling';
  }

  return 'Misc';
}

function parseExcelToBOM(): void {
  const excelPath = path.join(__dirname, '..', '..', 'BOM-and-SIM-zf-voltage-lightsheet-rsLSM1.1-2025-rebuild.xlsx');
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
      // Extract fields using actual column names from Excel
      const partNum = row['Part Num'] || '';
      const description = row['Description'] || '';
      const vendor = row['Vendor'] || '';
      const subassembly = row['Subassm.'] || '';
      const notes = row['Note'] || '';

      // Quantity fields
      const qDesign = parseInt(row['Q. Design'] || '0');
      const qBuy = parseInt(row['Q. Buy'] || '0');
      const qStock = parseInt(row['Q. Stock'] || '0');

      // Price fields
      const unitPrice = parseFloat((row['U. Price'] || '0').toString().replace(/[$,]/g, ''));
      const subtotal = parseFloat((row['Subtot.'] || '0').toString().replace(/[$,]/g, ''));

      // Skip rows with no part number or vendor (empty rows, headers, etc.)
      if (!partNum || !vendor || vendor === '(unknown)') {
        skippedRows++;
        return;
      }

      // Use Q. Buy if available, otherwise Q. Design, otherwise Q. Stock
      const quantity = qBuy > 0 ? qBuy : (qDesign > 0 ? qDesign : qStock);

      // Determine build phase from subassembly
      const buildPhase = getPhaseFromSubassembly(subassembly);

      // Categorize the part
      const category = categorizePart(subassembly, vendor, partNum);

      // Calculate total if not provided
      const totalPrice = subtotal > 0 ? subtotal : (quantity * unitPrice);

      bomItems.push({
        id: `bom-${String(bomItems.length + 1).padStart(3, '0')}`,
        name: partNum.trim(),
        description: description.trim() || partNum.trim(),
        vendor: vendor.trim(),
        partNumber: partNum.toString().trim(),
        quantity: quantity > 0 ? quantity : 1,
        unitPrice: unitPrice >= 0 ? unitPrice : 0,
        totalPrice: totalPrice >= 0 ? totalPrice : 0,
        category: category,
        buildPhase: buildPhase,
        notes: notes?.trim() || undefined,
        subassembly: subassembly.trim() || undefined,
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
    itemsBySubassembly: {},
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

    // Items by subassembly
    if (item.subassembly) {
      summary.itemsBySubassembly[item.subassembly] = (summary.itemsBySubassembly[item.subassembly] || 0) + 1;
    }
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

  console.log('\n🔧 ITEMS BY SUBASSEMBLY (Top 10):');
  Object.entries(summary.itemsBySubassembly)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([subassm, count]) => {
      console.log(`   ${subassm}: ${count}`);
    });

  console.log(`\n📁 Output saved to: ${outputPath}\n`);
}

// Run the parser
parseExcelToBOM();
