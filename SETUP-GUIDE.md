# Mars Bar Website - Complete Setup Guide

## 🚀 Quick Start

Your Mars Bar website is ready to go! Here's how to use the live band schedule with Excel integration:

### 1. Excel File Ready
✅ **Location**: `assets/schedule.xlsx`
✅ **Sample Data**: 12 bands across the week with Instagram handles and thumbnails
✅ **Format**: Day, Time, Band, Genre, Instagram, Thumbnail

### 2. Server Setup
```bash
# Install dependencies (already done)
npm install

# Test Excel processing
npm run test-schedule

# Start server
npm start
```

### 3. Add Band Images
📁 Upload band images to: `assets/bands/`

**Required images** (based on current schedule):
- lunar-echoes.jpg
- nebulae-nights.jpg
- crimson-meteors.jpg
- orbit-oddities.jpg
- red-dust-trio.jpg
- astroflora.jpg
- starlight-caravan.jpg
- zero-gravity-club.jpg
- martian-funk-syndicate.jpg
- mars-tones.jpg
- solar-flare-quartet.jpg
- alien-disco-ensemble.jpg

**Image specs**: 80x80px minimum, square format, under 100KB each

## 📊 How to Update the Schedule

### Weekly Updates (Recommended)
1. **Edit Excel**: Open `assets/schedule.xlsx` in Excel/Google Sheets
2. **Update bands**: Change band names, times, Instagram handles
3. **Save file**: Keep it as `schedule.xlsx` in the `assets/` folder
4. **Add images**: Upload new band images to `assets/bands/`
5. **Automatic**: Server updates every Sunday at 6 PM Singapore time

### Manual Update
```bash
# Force immediate update
curl -X POST http://localhost:3000/api/schedule/update
```

## 🎯 Excel Column Structure

| Column | Required | Example | Notes |
|--------|----------|---------|-------|
| Day | Yes | SUN | 3-letter format |
| Time | Yes | 8.30PM - 10.15PM | Any time format |
| Band | Yes | Lunar Echoes feat. Solis | Band name |
| Genre | Yes | Indie Pop / Dreamwave | Music genre |
| Instagram | No | @lunarechoes | Handle with or without @ |
| Thumbnail | No | assets/bands/lunar-echoes.jpg | Path to image |

## 🌐 Live Website

**Current URL**: https://website-3mavrm1eo-hjr-labs-projects.vercel.app
**GitHub**: https://github.com/HJR-lab/interplanetary

## 🔧 Server Commands

```bash
npm start          # Start server (port 3000)
npm run dev        # Start with auto-restart
npm run test-schedule  # Test Excel processing
npm run create-excel   # Create new sample Excel file
```

## 📱 Features Included

✅ **Responsive Design**: Works on all devices
✅ **Live Band Schedule**: Automatic Excel integration
✅ **Instagram Links**: Direct links to band profiles
✅ **Band Thumbnails**: 80x80px images with hover effects
✅ **PDF Menu**: Embedded menu with download
✅ **Instagram Gallery**: @themarsbarsg integration
✅ **Revolving Backgrounds**: bar.jpeg/bar2.jpeg rotation
✅ **Contact Forms**: Reservation and inquiry forms

## 🚨 Troubleshooting

**Schedule not updating?**
- Check `assets/schedule.xlsx` exists
- Verify Excel column headers match exactly
- Run `npm run test-schedule` to debug
- Check server logs for errors

**Images not showing?**
- Verify images exist in `assets/bands/` folder
- Check file names match Excel thumbnail column
- Images will hide gracefully if missing

**Server not starting?**
- Run `npm install` to install dependencies
- Check port 3000 is not in use
- Look for error messages in console

## 🎵 Next Steps

1. **Replace sample data** with your actual weekly bands
2. **Add real band images** to `assets/bands/` folder
3. **Set up weekly workflow** for updating the Excel file
4. **Configure domain** in Vercel dashboard if needed
5. **Test automation** by updating Excel and checking website

**Your website is live and ready for real band schedule data!** 🎸