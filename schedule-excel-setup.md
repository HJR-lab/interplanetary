# Live Band Schedule Excel Integration

## Overview
The Entertainment section automatically pulls live band schedule data from an Excel file every Sunday evening at 6 PM. The layout follows the design from `liveband_schedule.pdf`.

## Automatic Update Schedule
- **Update Time**: Every Sunday at 6:00 PM
- **Fallback**: Updates after 6 days if Sunday update missed
- **Caching**: Data cached locally for fast loading
- **Manual Override**: Force update available for admin use

## Excel File Structure

### Required Columns
Create an Excel file (`schedule.xlsx`) with these columns:

| Column A | Column B | Column C | Column D | Column E | Column F |
|----------|----------|----------|----------|----------|----------|
| Day | Time | Band | Genre | Instagram | Thumbnail |

### Example Data
```
Day | Time              | Band                           | Genre                      | Instagram        | Thumbnail
SUN | 8.30PM - 10.15PM | Lunar Echoes feat. Solis      | Indie Pop / Dreamwave     | @lunarechoes     | assets/bands/lunar-echoes.jpg
SUN | 10.30PM - 12.15AM| Nebulae Nights                | Space Jazz                 | @nebulaenights   | assets/bands/nebulae-nights.jpg
MON | 8.30PM - 12.15AM | The Crimson Meteors           | Indie Rock                 | @crimsonmeteors  | assets/bands/crimson-meteors.jpg
TUE | 8.30PM - 12.15AM | Orbit Oddities feat. Lyra     | Jazz / Pop Fusion          | @orbitoddities   | assets/bands/orbit-oddities.jpg
WED | 8.30PM - 10.15PM | Red Dust Trio                 | Cosmic Jazz                | @reddusttrio     | assets/bands/red-dust-trio.jpg
WED | 10.30PM - 12.15AM| Astroflora                    | Psychedelic Soul           | @astroflora      | assets/bands/astroflora.jpg
THU | 8.30PM - 10.15PM | Starlight Caravan feat. Vega  | Folk / Soul                | @starlightcaravan| assets/bands/starlight-caravan.jpg
THU | 10.30PM - 1.00AM | Zero Gravity Club             | Electronic Indie           | @zerogravityclub | assets/bands/zero-gravity-club.jpg
FRI | 8.00PM - 10.45PM | Martian Funk Syndicate        | Jazz / Soul / Funk         | @martianfunksyn  | assets/bands/martian-funk-syndicate.jpg
FRI | 11.00PM - Till Late| The Mars Tones             | Electronic Pop             | @themarstones    | assets/bands/mars-tones.jpg
SAT | 8.00PM - 10.45PM | Solar Flare Quartet feat. Orion| Jazz / Funk / Experimental| @solarflarequar | assets/bands/solar-flare-quartet.jpg
SAT | 11.00PM - Till Late| Alien Disco Ensemble        | Space Pop / Synth Funk    | @aliendiscoens   | assets/bands/alien-disco-ensemble.jpg
```

## Implementation Options

### Option 1: Server-Side Processing (Recommended)

#### Node.js/Express Example:
```javascript
const express = require('express');
const XLSX = require('xlsx');
const app = express();

app.get('/api/schedule', (req, res) => {
    try {
        const workbook = XLSX.readFile('assets/schedule.xlsx');
        const worksheet = workbook.Sheets['Sheet1'];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Group by day
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

        res.json(Object.values(schedule));
    } catch (error) {
        res.status(500).json({ error: 'Failed to read schedule' });
    }
});
```

#### PHP Example:
```php
<?php
require_once 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\IOFactory;

header('Content-Type: application/json');

try {
    $spreadsheet = IOFactory::load('assets/schedule.xlsx');
    $worksheet = $spreadsheet->getActiveSheet();
    $rows = $worksheet->toArray();

    $schedule = [];
    foreach ($rows as $index => $row) {
        if ($index === 0) continue; // Skip header

        $day = $row[0];
        if (!isset($schedule[$day])) {
            $schedule[$day] = [
                'day' => $day,
                'timeSlots' => []
            ];
        }

        $schedule[$day]['timeSlots'][] = [
            'time' => $row[1],
            'band' => $row[2],
            'genre' => $row[3],
            'instagram' => $row[4] ?? '',
            'thumbnail' => $row[5] ?? ''
        ];
    }

    echo json_encode(array_values($schedule));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read schedule']);
}
?>
```

### Option 2: Google Sheets Integration

1. Upload Excel to Google Sheets
2. Publish as CSV
3. Fetch CSV data with JavaScript:

```javascript
async function loadFromGoogleSheets() {
    const SHEET_URL = 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv';
    const response = await fetch(SHEET_URL);
    const csv = await response.text();

    // Parse CSV and convert to schedule format
    const scheduleData = parseCSVToSchedule(csv);
    displaySchedule(scheduleData);
}
```

### Option 3: Manual JSON Update

Create `assets/schedule.json`:
```json
[
    {
        "day": "SUN",
        "timeSlots": [
            {
                "time": "8.30PM - 10.15PM",
                "band": "Lunar Echoes feat. Solis",
                "genre": "Indie Pop / Dreamwave",
                "instagram": "@lunarechoes",
                "thumbnail": "assets/bands/lunar-echoes.jpg"
            },
            {
                "time": "10.30PM - 12.15AM",
                "band": "Nebulae Nights",
                "genre": "Space Jazz",
                "instagram": "@nebulaenights",
                "thumbnail": "assets/bands/nebulae-nights.jpg"
            }
        ]
    }
]
```

## File Locations

- **Excel File**: `assets/schedule.xlsx`
- **Fallback Data**: Hard-coded in HTML (current PDF data)
- **API Endpoint**: `/api/schedule` (needs server setup)

## Update Process

1. **Weekly Updates**: Edit the Excel file with new band information
2. **Upload**: Replace `assets/schedule.xlsx` with updated file
3. **Automatic**: Website will load new data on next page refresh
4. **Fallback**: If Excel fails, shows current week's schedule from HTML

## Styling Features

- **Responsive Grid**: Automatically adjusts for mobile/desktop
- **Hover Effects**: Interactive cards with smooth animations
- **Typography**: Matches Mars Bar aesthetic
- **Color Scheme**: Consistent with site design
- **Layout**: Mirrors the PDF design exactly
- **Band Thumbnails**: 80x80px images with hover effects
- **Instagram Integration**: Clickable handles linking to band profiles
- **Professional Layout**: Image + info layout for enhanced visual appeal

## Testing

- Current implementation shows fallback data from PDF
- To test Excel integration, set up server endpoint
- Fallback ensures site always shows schedule information

## Benefits

- **Easy Updates**: Non-technical staff can update Excel weekly
- **Professional Layout**: Matches provided PDF design
- **Responsive**: Works on all devices
- **Reliable**: Fallback ensures schedule always displays
- **Consistent Branding**: Matches Mars Bar design language