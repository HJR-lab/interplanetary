# The Mars Bar Website

A sophisticated, modern website for The Mars Bar restaurant and cocktail lounge in Singapore. Features elegant design with a space-themed aesthetic, live band scheduling, and comprehensive reservation system.

## 🚀 Features

### Design & Aesthetics
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Mars Bar Branding**: Custom red color scheme (#82231E) with sand beige text (#E1D2AA)
- **Long Logo Integration**: Professional logo display in header and footer
- **Revolving Backgrounds**: Alternating hero images (bar.jpeg/bar2.jpeg) on refresh

### Sections
1. **Home**: Hero section with revolving background images and call-to-action buttons
2. **Story**: About The Mars Bar with elegant typography and imagery
3. **Show**: Live band schedule with automatic Excel integration
4. **Menu**: PDF menu display with download functionality
5. **Gallery**: Instagram integration for latest photos (@themarsbarsg)
6. **Reservation**: Comprehensive booking form with company field option

### Advanced Features
- **Live Band Schedule**: Automatically updates from Excel every Sunday at 6 PM
- **Instagram Integration**: Displays 3 most recent posts from @themarsbarsg
- **PDF Menu Display**: Embedded menu viewer with download option
- **Smart Caching**: Local storage for schedule and Instagram data
- **Form Validation**: Professional reservation and contact forms

## 📁 File Structure

```
/
├── index.html              # Main website file
├── styles.css              # All styling and responsive design
├── script.js               # Interactive functionality
├── /assets/
│   ├── TMB_Logo_long.png   # Mars Bar logo (long format)
│   ├── bar.jpeg            # Hero background image 1
│   ├── bar2.jpeg           # Hero background image 2
│   ├── menu.pdf            # Restaurant menu PDF
│   └── schedule.xlsx       # Live band schedule (optional)
├── schedule-excel-setup.md # Excel integration documentation
├── instagram-setup.md      # Instagram API setup guide
└── server-schedule-automation.js # Server automation example
```

## 🎨 Design Specifications

### Colors
- **Primary Red**: #82231E (background)
- **Accent Red**: #B8312F (buttons, highlights)
- **Text**: #E1D2AA (sand beige)
- **Borders**: rgba(225, 210, 170, 0.3)

### Typography
- **Headings**: Cormorant Garamond (serif)
- **Body**: Inter (sans-serif)
- **Responsive**: clamp() functions for fluid scaling

### Layout
- **Navigation**: Home, Story, Show, Menu, Gallery, Reservation
- **Responsive Grid**: CSS Grid and Flexbox
- **Mobile-First**: Progressive enhancement approach

## 🛠 Setup Instructions

### Basic Setup
1. **Clone/Download** the repository
2. **Open** `index.html` in a web browser
3. **Upload** to your web server

### Advanced Features Setup

#### Live Band Schedule (Excel Integration)
1. Create `schedule.xlsx` with columns: Day, Time, Band, Genre, Instagram, Thumbnail
2. Set up server endpoint at `/api/schedule`
3. Schedule updates automatically every Sunday 6 PM
4. See `schedule-excel-setup.md` for details

#### Instagram Integration
1. Set up Instagram Basic Display API
2. Get access token for @themarsbarsg
3. Configure server proxy for CORS
4. See `instagram-setup.md` for details

#### Menu PDF
1. Replace `assets/menu.pdf` with your menu
2. PDF displays embedded with download option
3. Responsive landscape format

## 🔧 Configuration

### Restaurant Information
Update in `index.html`:
- **Address**: 200 Middle Road, Singapore 188980
- **Phone**: +65 9618 1013
- **Email**: reservations@themarsbar.sg

### Social Media
- **Instagram**: @themarsbarsg
- Update handles in gallery section

### Contact Form
- Form submits to: reservations@themarsbar.sg
- Uses FormSubmit.co service
- Includes company field for corporate bookings

## 📱 Mobile Optimization

### Responsive Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Mobile Features
- Hamburger navigation menu
- Touch-friendly buttons and forms
- Optimized image sizes
- Swipe-friendly gallery

## 🎵 Live Entertainment

### Schedule Format
Weekly live band schedule with:
- **Days**: Sunday through Saturday
- **Time Slots**: Multiple shows per day
- **Band Information**: Name, genre, features
- **Automatic Updates**: Every Sunday evening

### Excel Structure
```
Day | Time              | Band                    | Genre                  | Instagram        | Thumbnail
SUN | 8.30PM - 10.15PM | Lunar Echoes feat. Solis | Indie Pop / Dreamwave | @lunarechoes     | assets/bands/lunar-echoes.jpg
MON | 8.30PM - 12.15AM | The Crimson Meteors     | Indie Rock            | @crimsonmeteors  | assets/bands/crimson-meteors.jpg
```

## 🍽 Menu System

### PDF Integration
- **Embedded Viewer**: Shows menu directly on page
- **Download Option**: Full PDF download available
- **Responsive**: Landscape format optimized for all screens
- **Hover Effects**: Interactive overlay for better UX

## 📸 Gallery & Social

### Instagram Integration
- **Auto-fetch**: 3 most recent posts from @themarsbarsg
- **Fallback**: Placeholder grid if API unavailable
- **Full Width**: Gallery spans entire page width
- **Direct Links**: Click to view on Instagram

## 🎯 SEO & Performance

### Optimization
- **Semantic HTML**: Proper heading hierarchy
- **Meta Tags**: Title, description, viewport
- **Image Optimization**: Proper alt tags and lazy loading
- **Fast Loading**: Optimized CSS and JavaScript

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Android Chrome
- **Fallbacks**: Graceful degradation for older browsers

## 🚀 Deployment

### Static Hosting
Works with any static hosting service:
- **GitHub Pages**
- **Netlify**
- **Vercel**
- **Traditional Web Hosting**

### Server Features (Optional)
For advanced features, deploy with:
- **Node.js** server for Excel processing
- **PHP** server for form handling
- **Cron jobs** for scheduled updates

## 📞 Support & Contact

**The Mars Bar**
- **Address**: 200 Middle Road, Singapore 188980
- **Phone**: +65 9618 1013
- **Email**: reservations@themarsbar.sg
- **Instagram**: @themarsbarsg

---

**Built with modern web technologies for The Mars Bar - Interplanetary LIVE music. All aliens welcome.**