const express = require('express');
// require CORS
const app = express();
const port = 3000;
const path = require('path');

const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));

// Gallery
app.use('/gallery/stays/:roomId', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
// separate /gallery/lists endpoint
app.use('/gallery/list', createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

// Booking
app.use('/booking/', createProxyMiddleware({ target: 'http://localhost:3002', changeOrigin: true }));

// Reviews
app.use('/reviews/stays', createProxyMiddleware({ target: 'http://localhost:3003', changeOrigin: true }));

// More Places
app.use('/more-places/stays', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));
// separate /more-places/lists endpoint
app.use('/more-places/favorites', createProxyMiddleware({ target: 'http://localhost:3004', changeOrigin: true }));

app.listen(port, () => {
  console.log(`Keybox running at: http://localhost:${port}`);
});
