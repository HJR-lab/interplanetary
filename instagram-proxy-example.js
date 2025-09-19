// Example server-side proxy for Instagram API
// This file shows how to create a backend endpoint to fetch Instagram data

// For Node.js/Express server:
const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Instagram configuration
const INSTAGRAM_ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';
const INSTAGRAM_USER_ID = 'YOUR_USER_ID_HERE'; // Get this from Instagram API

// Enable CORS for your domain
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Instagram feed endpoint
app.get('/api/instagram-feed', async (req, res) => {
    try {
        const response = await fetch(
            `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=3&access_token=${INSTAGRAM_ACCESS_TOKEN}`
        );

        if (!response.ok) {
            throw new Error('Instagram API request failed');
        }

        const data = await response.json();

        // Filter for images only, get 3 most recent
        const images = data.data
            .filter(post => post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM')
            .slice(0, 3)
            .map(post => ({
                id: post.id,
                image_url: post.media_url,
                caption: post.caption || '',
                permalink: post.permalink
            }));

        res.json({ success: true, images });

    } catch (error) {
        console.error('Instagram API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch Instagram feed'
        });
    }
});

// For PHP server (alternative):
/*
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://yourdomain.com');

$access_token = 'YOUR_ACCESS_TOKEN_HERE';
$user_id = 'YOUR_USER_ID_HERE';

$url = "https://graph.instagram.com/{$user_id}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=3&access_token={$access_token}";

$response = file_get_contents($url);
$data = json_decode($response, true);

if ($data && isset($data['data'])) {
    $images = array();
    $count = 0;

    foreach ($data['data'] as $post) {
        if ($count >= 3) break;

        if ($post['media_type'] === 'IMAGE' || $post['media_type'] === 'CAROUSEL_ALBUM') {
            $images[] = array(
                'id' => $post['id'],
                'image_url' => $post['media_url'],
                'caption' => isset($post['caption']) ? $post['caption'] : '',
                'permalink' => $post['permalink']
            );
            $count++;
        }
    }

    echo json_encode(array('success' => true, 'images' => $images));
} else {
    echo json_encode(array('success' => false, 'error' => 'Failed to fetch Instagram feed'));
}
?>
*/

app.listen(3000, () => {
    console.log('Instagram proxy server running on port 3000');
});

module.exports = app;