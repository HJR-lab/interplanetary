const XLSX = require('xlsx');
const fs = require('fs');

function testExcelProcessing() {
    try {
        console.log('Testing Excel schedule processing...\n');

        // Check if Excel file exists
        if (!fs.existsSync('assets/schedule.xlsx')) {
            console.log('❌ Excel file not found at assets/schedule.xlsx');
            console.log('Run "npm run create-excel" first to create a sample file.\n');
            return;
        }

        // Process Excel file
        const workbook = XLSX.readFile('assets/schedule.xlsx');
        const worksheet = workbook.Sheets['Sheet1'];
        const data = XLSX.utils.sheet_to_json(worksheet);

        console.log(`✅ Excel file loaded successfully`);
        console.log(`📊 Found ${data.length} schedule entries\n`);

        // Group by day and format data
        const schedule = {};
        data.forEach(row => {
            if (!schedule[row.Day]) {
                schedule[row.Day] = {
                    day: row.Day,
                    timeSlots: []
                };
            }
            schedule[row.Day].timeSlots.push({
                time: row.Time,
                band: row.Band,
                genre: row.Genre,
                instagram: row.Instagram || '',
                thumbnail: row.Thumbnail || ''
            });
        });

        const processedSchedule = Object.values(schedule);
        console.log('📅 Processed Schedule:');
        console.log('===================');

        processedSchedule.forEach(dayData => {
            console.log(`\n${dayData.day}:`);
            dayData.timeSlots.forEach(slot => {
                console.log(`  ${slot.time} - ${slot.band}`);
                console.log(`    Genre: ${slot.genre}`);
                if (slot.instagram) console.log(`    Instagram: ${slot.instagram}`);
                if (slot.thumbnail) console.log(`    Thumbnail: ${slot.thumbnail}`);
            });
        });

        console.log('\n✅ Excel processing test completed successfully!');
        console.log('🚀 Ready to start server with: npm start');

    } catch (error) {
        console.error('❌ Error processing Excel file:', error.message);
        console.log('\nTroubleshooting:');
        console.log('1. Make sure assets/schedule.xlsx exists');
        console.log('2. Check the Excel file has the correct column headers');
        console.log('3. Run "npm run create-excel" to create a sample file');
    }
}

testExcelProcessing();