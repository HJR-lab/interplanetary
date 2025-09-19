// Server-side automation for live band schedule updates
// This example shows how to set up automatic Excel processing

const express = require('express');
const XLSX = require('xlsx');
const cron = require('node-cron');
const fs = require('fs');
const app = express();

// Store processed schedule data
let currentSchedule = null;
let lastUpdateTime = null;

// Process Excel file and convert to JSON
function processExcelSchedule() {
    try {
        console.log('Processing Excel schedule...');

        const workbook = XLSX.readFile('assets/schedule.xlsx');
        const worksheet = workbook.Sheets['Sheet1'];
        const data = XLSX.utils.sheet_to_json(worksheet);

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

        currentSchedule = Object.values(schedule);
        lastUpdateTime = new Date().toISOString();

        // Save processed data to JSON file for backup
        fs.writeFileSync('assets/processed-schedule.json', JSON.stringify(currentSchedule, null, 2));

        console.log(`Schedule processed successfully at ${lastUpdateTime}`);
        return currentSchedule;
    } catch (error) {
        console.error('Error processing Excel schedule:', error);

        // Try to load from backup JSON file
        try {
            const backupData = fs.readFileSync('assets/processed-schedule.json', 'utf8');
            currentSchedule = JSON.parse(backupData);
            console.log('Loaded schedule from backup file');
        } catch (backupError) {
            console.error('Failed to load backup schedule:', backupError);
        }

        return null;
    }
}

// API endpoint for schedule data
app.get('/api/schedule', (req, res) => {
    // Check if we have current data
    if (!currentSchedule) {
        currentSchedule = processExcelSchedule();
    }

    if (currentSchedule) {
        res.json(currentSchedule);
    } else {
        res.status(500).json({
            error: 'Schedule data not available',
            lastUpdate: lastUpdateTime
        });
    }
});

// Manual update endpoint (for admin use)
app.post('/api/schedule/update', (req, res) => {
    const newSchedule = processExcelSchedule();
    if (newSchedule) {
        res.json({
            message: 'Schedule updated successfully',
            updateTime: lastUpdateTime,
            scheduleCount: newSchedule.length
        });
    } else {
        res.status(500).json({ error: 'Failed to update schedule' });
    }
});

// Automatic schedule update every Sunday at 6:00 PM
// Cron pattern: '0 18 * * 0' = At 18:00 on Sunday
cron.schedule('0 18 * * 0', () => {
    console.log('Running scheduled update: Sunday 6:00 PM');
    processExcelSchedule();
}, {
    timezone: "Asia/Singapore" // Adjust to your timezone
});

// Backup update - run daily at 2 AM to check for missed updates
cron.schedule('0 2 * * *', () => {
    const now = new Date();
    const lastUpdate = new Date(lastUpdateTime);
    const daysSinceUpdate = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));

    // If it's been more than 6 days, force update
    if (daysSinceUpdate >= 6) {
        console.log('Running backup update - schedule outdated');
        processExcelSchedule();
    }
}, {
    timezone: "Asia/Singapore"
});

// Initialize schedule on server start
processExcelSchedule();

// Health check endpoint
app.get('/api/schedule/status', (req, res) => {
    res.json({
        hasSchedule: !!currentSchedule,
        lastUpdate: lastUpdateTime,
        scheduleCount: currentSchedule ? currentSchedule.length : 0
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Schedule server running on port ${PORT}`);
    console.log('Automatic updates scheduled for Sunday 6:00 PM Singapore time');
});

module.exports = app;

/*
Installation requirements:
npm install express xlsx node-cron

Usage:
1. Place this file as your server.js
2. Ensure schedule.xlsx is in assets/ folder
3. Run: node server.js
4. Schedule will auto-update every Sunday at 6 PM
5. Manual update available at POST /api/schedule/update

File structure:
/assets/
  - schedule.xlsx (your weekly Excel file)
  - processed-schedule.json (auto-generated backup)

Features:
- Automatic Sunday 6 PM updates
- Backup daily check for missed updates
- Manual update endpoint for immediate updates
- Fallback to backup JSON file if Excel fails
- Health status endpoint for monitoring
- Singapore timezone support
*/