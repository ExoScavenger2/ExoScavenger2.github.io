const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const earthRadius = 50;
const sunRadius = 70;
const satelliteRadius = 15;
const satellites = [];

// Create some satellites with random orbits
for (let i = 0; i < 5; i++) {
    satellites.push({
        angle: Math.random() * Math.PI * 2,
        distance: 100 + Math.random() * 150,
        damaged: Math.random() < 0.5 // Randomly mark some satellites as damaged
    });
}

// Function to draw the sun
function drawSun() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
}

// Function to draw the Earth
function drawEarth() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'green';
    ctx.fill();
}

// Function to draw satellites
function drawSatellites() {
    satellites.forEach(satellite => {
        satellite.angle += 0.02; // Rotate satellite
        const x = canvas.width / 2 + Math.cos(satellite.angle) * satellite.distance;
        const y = canvas.height / 2 + Math.sin(satellite.angle) * satellite.distance;
        
        ctx.beginPath();
        ctx.arc(x, y, satelliteRadius, 0, Math.PI * 2);
        ctx.fillStyle = satellite.damaged ? 'red' : 'white'; // Change color if damaged
        ctx.fill();
    });
}

// Function to draw geomagnetic storm effect
function drawStorm() {
    const auroraColor = 'rgba(0, 255, 0, 0.2)';
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, earthRadius + 10 + i * 10, 0, Math.PI * 2);
        ctx.strokeStyle = auroraColor;
        ctx.lineWidth = 3;
        ctx.stroke();
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSun();
    drawEarth();
    drawSatellites();
    drawStorm();
    requestAnimationFrame(animate);
}

animate();
