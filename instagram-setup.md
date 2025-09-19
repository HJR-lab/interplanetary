# Instagram Feed Setup Instructions

To display the 3 most recent images from @themarsbarsg, you need to set up Instagram Basic Display API access.

## Method 1: Instagram Basic Display API (Recommended)

### Step 1: Create Facebook Developer Account
1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Log in with your Facebook account (or create one)
3. Create a new app and select "Consumer" type

### Step 2: Add Instagram Basic Display Product
1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Go to Instagram Basic Display → Basic Display

### Step 3: Create Instagram Test User
1. In Instagram Basic Display settings, scroll to "User Token Generator"
2. Click "Add or Remove Instagram Testers"
3. Add the Instagram account @themarsbarsg
4. The account owner needs to accept the tester invitation

### Step 4: Generate Access Token
1. Go back to "User Token Generator"
2. Click "Generate Token" for @themarsbarsg
3. Copy the generated access token

### Step 5: Update Website Code
1. Open `script.js`
2. Find the line: `const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';`
3. Replace `'YOUR_ACCESS_TOKEN'` with your actual token:
   ```javascript
   const ACCESS_TOKEN = 'IGQVJYour_Actual_Token_Here';
   ```

### Step 6: Handle CORS (Required for Production)
Since Instagram API has CORS restrictions, you'll need one of these solutions:

#### Option A: Server-Side Proxy (Recommended)
Create a server endpoint that fetches Instagram data:
```javascript
// Replace the direct API call in script.js with:
const response = await fetch('/api/instagram-feed');
```

#### Option B: Use a Service
Consider using services like:
- Instafeed.js
- Instagram Feed plugins
- Third-party Instagram APIs

## Method 2: Alternative Solutions

### Option A: Static Images
Manually update 3 images periodically:
1. Download latest 3 images from @themarsbarsg
2. Save as `img1.jpg`, `img2.jpg`, `img3.jpg` in assets folder
3. Update the fallback gallery to show these images

### Option B: Instagram Embed Widget
Use Instagram's official embed widget for recent posts.

## Security Notes

- **Never expose access tokens in client-side code for production**
- Access tokens expire and need refresh
- Always use server-side proxy for production websites
- Consider rate limiting to avoid API quotas

## Testing

1. After setup, the website should automatically load the 3 most recent images
2. If API fails, it falls back to placeholder grid
3. Images link back to original Instagram posts

## Troubleshooting

- **CORS Error**: Use server-side proxy
- **Invalid Token**: Regenerate access token
- **No Images**: Check if @themarsbarsg accepted tester invitation
- **Rate Limit**: Implement caching and reduce API calls

For immediate testing, you can manually add 3 recent images to the assets folder and update the fallback display.