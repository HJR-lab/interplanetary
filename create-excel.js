const XLSX = require('xlsx');
const fs = require('fs');

// Read the CSV file
const csvData = fs.readFileSync('assets/schedule.csv', 'utf8');

// Parse CSV manually
const lines = csvData.split('\n');
const headers = lines[0].split(',');
const data = [];

for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
        const values = lines[i].split(',');
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] || '';
        });
        data.push(row);
    }
}

// Create workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);

// Add worksheet to workbook
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// Write Excel file
XLSX.writeFile(workbook, 'assets/schedule.xlsx');

console.log('Excel file created successfully at assets/schedule.xlsx');
console.log('Sample data includes:');
console.log('- 12 time slots across the week');
console.log('- Instagram handles for each band');
console.log('- Thumbnail image paths');
console.log('\nTo use this file:');
console.log('1. Edit the Excel file with your actual band data');
console.log('2. Add band images to assets/bands/ folder');
console.log('3. Start the server with: npm start');