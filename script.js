// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(130, 35, 30, 0.98)';
    } else {
        header.style.background = 'rgba(130, 35, 30, 0.95)';
    }
});

// Form handling
const bookingForm = document.querySelector('.booking-form');
const inquiryForm = document.querySelector('.inquiry-form');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate required fields
        const requiredFields = ['date', 'time', 'guests', 'name', 'email', 'phone'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#D64545';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(184, 49, 47, 0.3)';
            }
        });

        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your reservation request! We will contact you shortly to confirm your booking.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

if (inquiryForm) {
    inquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Validate required fields
        const requiredFields = ['name', 'email', 'subject', 'message'];
        let isValid = true;

        requiredFields.forEach(field => {
            const input = this.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                input.style.borderColor = '#D64545';
                isValid = false;
            } else {
                input.style.borderColor = 'rgba(184, 49, 47, 0.3)';
            }
        });

        if (isValid) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            alert('Please fill in all required fields.');
        }
    });
}

// Gallery hover effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Set minimum date for reservation form
const dateInput = document.querySelector('#date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Prevent form submission on demo
document.addEventListener('DOMContentLoaded', function() {
    // Add some dynamic content
    const imageElements = document.querySelectorAll('.image-placeholder');
    imageElements.forEach((el, index) => {
        el.innerHTML = `<span style="opacity: 0.6;">Image ${index + 1}</span>`;
    });

    // Add hover effects to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(184, 49, 47, 0.1)';
            this.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
            this.style.transform = 'translateX(0)';
        });
    });

    // Load Instagram feed
    loadInstagramFeed();

    // Load live band schedule
    loadBandSchedule();

    // Set revolving background image
    setRevolvingBackground();
});

// Instagram feed functionality
async function loadInstagramFeed() {
    const instagramFeed = document.getElementById('instagram-feed');
    const galleryFallback = document.getElementById('gallery-fallback');

    try {
        // Method 1: Using Instagram Basic Display API (requires access token)
        // You need to set up Instagram Basic Display API at developers.facebook.com
        // Replace 'YOUR_ACCESS_TOKEN' with your actual access token

        const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // Replace with actual token

        if (ACCESS_TOKEN !== 'YOUR_ACCESS_TOKEN') {
            const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=3&access_token=${ACCESS_TOKEN}`);

            if (!response.ok) {
                throw new Error('Instagram API request failed');
            }

            const data = await response.json();

            if (data.data && data.data.length > 0) {
                displayInstagramPosts(data.data.slice(0, 3));
                return;
            }
        }

        // Method 2: Try server-side proxy (recommended for production)
        try {
            const proxyResponse = await fetch('/api/instagram-feed');
            if (proxyResponse.ok) {
                const proxyData = await proxyResponse.json();
                if (proxyData.success && proxyData.images && proxyData.images.length > 0) {
                    displayInstagramImages(proxyData.images.slice(0, 3));
                    return;
                }
            }
        } catch (proxyError) {
            console.log('Server proxy not available');
        }

        throw new Error('No Instagram access method configured');

    } catch (error) {
        console.log('Instagram feed unavailable:', error.message);
        showInstagramFallback();
    }
}

// Function to display Instagram posts (for when API is integrated)
function displayInstagramPosts(posts) {
    const instagramFeed = document.getElementById('instagram-feed');
    const loadingMessage = document.querySelector('.loading-message');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Clear the feed
    instagramFeed.innerHTML = '';

    // Add only the first 3 posts
    const recentPosts = posts.slice(0, 3);

    recentPosts.forEach(post => {
        const postElement = createInstagramPost(post);
        instagramFeed.appendChild(postElement);
    });
}

// Function to display Instagram images from server proxy
function displayInstagramImages(images) {
    const instagramFeed = document.getElementById('instagram-feed');
    const loadingMessage = document.querySelector('.loading-message');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Clear the feed
    instagramFeed.innerHTML = '';

    // Add the 3 most recent images
    images.forEach(image => {
        const imageElement = createInstagramImage(image);
        instagramFeed.appendChild(imageElement);
    });
}

function showInstagramFallback() {
    const instagramFeed = document.getElementById('instagram-feed');
    const galleryFallback = document.getElementById('gallery-fallback');
    const loadingMessage = document.querySelector('.loading-message');

    // Hide loading message and show fallback
    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Hide the instagram feed container
    instagramFeed.style.display = 'none';

    // Show the fallback grid
    galleryFallback.style.display = 'block';
}

// Function to create Instagram post element (for future API integration)
function createInstagramPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'instagram-post';

    const isVideo = post.media_type === 'VIDEO';
    const mediaUrl = isVideo ? post.thumbnail_url : post.media_url;

    postElement.innerHTML = `
        <img src="${mediaUrl}" alt="Instagram post" loading="lazy">
        <div class="instagram-post-overlay">
            <div class="instagram-post-caption">
                ${post.caption ? post.caption.substring(0, 100) + '...' : ''}
            </div>
        </div>
    `;

    postElement.addEventListener('click', () => {
        window.open(post.permalink, '_blank');
    });

    return postElement;
}

// Function to create Instagram image element (for server proxy)
function createInstagramImage(image) {
    const imageElement = document.createElement('div');
    imageElement.className = 'instagram-post';

    imageElement.innerHTML = `
        <img src="${image.image_url}" alt="Instagram from @themarsbarsg" loading="lazy" onerror="this.parentElement.style.display='none'">
        <div class="instagram-post-overlay">
            <div class="instagram-post-caption">
                ${image.caption ? image.caption.substring(0, 100) + '...' : 'View on Instagram'}
            </div>
        </div>
    `;

    imageElement.addEventListener('click', () => {
        window.open(image.permalink, '_blank');
    });

    return imageElement;
}

// Menu PDF functionality
function openMenuPDF() {
    window.open('assets/menu.pdf', '_blank');
}

// Revolving background images functionality
function setRevolvingBackground() {
    const heroSection = document.querySelector('.hero');
    const backgroundImages = [
        'assets/bar.jpeg',
        'assets/bar2.jpeg'
    ];

    // Get a random image or alternate based on session
    let selectedImage;

    // Check if we've stored a preference for this session
    const lastImage = sessionStorage.getItem('lastHeroImage');

    if (!lastImage) {
        // First visit - random selection
        selectedImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    } else {
        // Alternate from last image
        const lastIndex = backgroundImages.indexOf(lastImage);
        const nextIndex = (lastIndex + 1) % backgroundImages.length;
        selectedImage = backgroundImages[nextIndex];
    }

    // Store the selected image for next refresh
    sessionStorage.setItem('lastHeroImage', selectedImage);

    // Apply the background image with the existing gradient overlay
    heroSection.style.backgroundImage = `
        linear-gradient(rgba(130, 35, 30, 0.7), rgba(130, 35, 30, 0.8)),
        url('${selectedImage}')
    `;

    console.log(`Hero background set to: ${selectedImage}`);
}

// Optional: Function to manually cycle background (for testing or user interaction)
function cycleBackground() {
    const heroSection = document.querySelector('.hero');
    const backgroundImages = [
        'assets/bar.jpeg',
        'assets/bar2.jpeg'
    ];

    const currentImage = sessionStorage.getItem('lastHeroImage') || backgroundImages[0];
    const currentIndex = backgroundImages.indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % backgroundImages.length;
    const nextImage = backgroundImages[nextIndex];

    sessionStorage.setItem('lastHeroImage', nextImage);

    heroSection.style.backgroundImage = `
        linear-gradient(rgba(130, 35, 30, 0.7), rgba(130, 35, 30, 0.8)),
        url('${nextImage}')
    `;

    console.log(`Background cycled to: ${nextImage}`);
}

// Live Band Schedule functionality
async function loadBandSchedule() {
    const scheduleGrid = document.getElementById('schedule-grid');
    const scheduleFallback = document.getElementById('schedule-fallback');

    try {
        // Check if we need to update from Excel (every Sunday evening)
        const shouldUpdate = checkScheduleUpdateTime();

        // Try to load from cached data first, then Excel if update needed
        let scheduleData = getCachedSchedule();

        if (!scheduleData || shouldUpdate) {
            // Load fresh data from Excel
            const response = await fetch('/api/schedule?timestamp=' + Date.now());
            if (response.ok) {
                scheduleData = await response.json();
                // Cache the new data with timestamp
                cacheScheduleData(scheduleData);
                console.log('Schedule updated from Excel sheet');
            }
        }

        if (scheduleData && scheduleData.length > 0) {
            displaySchedule(scheduleData);
            return;
        }
    } catch (error) {
        console.log('Excel schedule not available, showing fallback:', error.message);
    }

    // Show fallback schedule
    showScheduleFallback();
}

// Check if it's time to update schedule (Sunday evening)
function checkScheduleUpdateTime() {
    const now = new Date();
    const lastUpdate = localStorage.getItem('scheduleLastUpdate');

    // Check if it's Sunday (0) and after 6 PM (18:00)
    const isSundayEvening = now.getDay() === 0 && now.getHours() >= 18;

    if (!lastUpdate) {
        return true; // First time loading
    }

    const lastUpdateDate = new Date(lastUpdate);
    const daysSinceUpdate = Math.floor((now - lastUpdateDate) / (1000 * 60 * 60 * 24));

    // Update if it's been more than 6 days OR it's Sunday evening and hasn't been updated today
    return daysSinceUpdate >= 6 || (isSundayEvening && !isSameDay(now, lastUpdateDate));
}

function isSameDay(date1, date2) {
    return date1.toDateString() === date2.toDateString();
}

// Cache schedule data locally
function cacheScheduleData(scheduleData) {
    try {
        localStorage.setItem('bandScheduleData', JSON.stringify(scheduleData));
        localStorage.setItem('scheduleLastUpdate', new Date().toISOString());
    } catch (error) {
        console.log('Failed to cache schedule data:', error);
    }
}

// Get cached schedule data
function getCachedSchedule() {
    try {
        const cachedData = localStorage.getItem('bandScheduleData');
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.log('Failed to load cached schedule:', error);
        return null;
    }
}

// Force schedule update (for admin use)
function forceScheduleUpdate() {
    localStorage.removeItem('bandScheduleData');
    localStorage.removeItem('scheduleLastUpdate');
    loadBandSchedule();
    console.log('Schedule update forced');
}

function displaySchedule(scheduleData) {
    const scheduleGrid = document.getElementById('schedule-grid');
    const loadingMessage = document.querySelector('.loading-schedule');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    scheduleGrid.innerHTML = '';

    scheduleData.forEach(dayData => {
        const dayElement = createDaySchedule(dayData);
        scheduleGrid.appendChild(dayElement);
    });
}

function createDaySchedule(dayData) {
    const dayElement = document.createElement('div');
    dayElement.className = 'day-schedule';

    let timeSlotsHTML = '';
    dayData.timeSlots.forEach(slot => {
        const thumbnailHTML = slot.thumbnail ? `
            <div class="band-thumbnail">
                <img src="${slot.thumbnail}" alt="${slot.band}" onerror="this.style.display='none'">
            </div>
        ` : '';

        const instagramHTML = slot.instagram ? `
            <span class="instagram"><a href="https://instagram.com/${slot.instagram.replace('@', '')}" target="_blank">${slot.instagram}</a></span>
        ` : '';

        timeSlotsHTML += `
            <div class="time-slot">
                ${thumbnailHTML}
                <div class="slot-info">
                    <span class="time">${slot.time}</span>
                    <span class="band">${slot.band}</span>
                    <span class="genre">${slot.genre}</span>
                    ${instagramHTML}
                </div>
            </div>
        `;
    });

    dayElement.innerHTML = `
        <div class="day-header">${dayData.day}</div>
        ${timeSlotsHTML}
    `;

    return dayElement;
}

function showScheduleFallback() {
    const scheduleGrid = document.getElementById('schedule-grid');
    const scheduleFallback = document.getElementById('schedule-fallback');
    const loadingMessage = document.querySelector('.loading-schedule');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    scheduleGrid.style.display = 'none';
    scheduleFallback.style.display = 'grid';
}

// Instagram display functions
function displayInstagramImages(images) {
    const instagramFeed = document.getElementById('instagram-feed');
    const loadingMessage = document.querySelector('.loading-message');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    // Clear the feed
    instagramFeed.innerHTML = '';

    // Add only the first 3 images
    const recentImages = images.slice(0, 3);

    recentImages.forEach(image => {
        const imageElement = createInstagramImage(image);
        instagramFeed.appendChild(imageElement);
    });
}

function createInstagramImage(image) {
    const imageElement = document.createElement('div');
    imageElement.className = 'instagram-item';

    imageElement.innerHTML = `
        <a href="${image.permalink}" target="_blank" rel="noopener" class="instagram-link">
            <img src="${image.media_url}" alt="${image.caption || 'Instagram post'}" class="instagram-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjODIyMzFFIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI0UxRDJBQSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            <div class="instagram-overlay">
                <span class="instagram-icon">📷</span>
            </div>
        </a>
    `;

    return imageElement;
}

function showInstagramFallback() {
    const instagramFeed = document.getElementById('instagram-feed');
    const galleryFallback = document.getElementById('gallery-fallback');
    const loadingMessage = document.querySelector('.loading-message');

    if (loadingMessage) {
        loadingMessage.style.display = 'none';
    }

    instagramFeed.style.display = 'none';
    galleryFallback.style.display = 'block';
}