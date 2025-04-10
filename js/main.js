// main.js

// Step 1: Create a map object and set the initial view to your campus
const map = L.map('mapid').setView([YOUR_CAMPUS_LAT, YOUR_CAMPUS_LON], 17);

// Step 2: Add OSM tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);
