const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const earthRadius = 50;
const sunRadius = 90;
const satelliteRadius = 10;
const satellites = [];

// Create some satellites with random orbits
for (let i = 0; i < 8; i++) {
    satellites.push({
        angle: Math.random() * Math.PI * 2,
        distance: 100 + Math.random() * 200,
        damaged: Math.random() < 0.5, // Randomly mark some satellites as damaged
        color: getRandomColor(), // Assign random colors for each satellite
        name: `Satellite ${i + 1}` // Add a name to each satellite
    });
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Function to draw the sun
function drawSun() {
    const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, sunRadius * 0.5, canvas.width / 2, canvas.height / 2, sunRadius);
    gradient.addColorStop(0, 'rgba(255, 255, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 204, 0, 0.5)');
    
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, sunRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw sun rays
    for (let i = 0; i < 12; i++) {
        const angle = i * (Math.PI / 6);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + Math.cos(angle) * sunRadius, canvas.height / 2 + Math.sin(angle) * sunRadius);
        ctx.lineTo(canvas.width / 2 + Math.cos(angle) * (sunRadius + 20), canvas.height / 2 + Math.sin(angle) * (sunRadius + 20));
        ctx.strokeStyle = 'rgba(255, 255, 0, 0.7)';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// Function to draw the Earth
function drawEarth() {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, earthRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 3;
    ctx.stroke(); // Add a border to Earth
}

// Function to draw satellites with details
function drawSatellites() {
    satellites.forEach(satellite => {
        satellite.angle += 0.02; // Rotate satellite
        const x = canvas.width / 2 + Math.cos(satellite.angle) * satellite.distance;
        const y = canvas.height / 2 + Math.sin(satellite.angle) * satellite.distance;

        ctx.beginPath();
        ctx.arc(x, y, satelliteRadius, 0, Math.PI * 2);
        ctx.fillStyle = satellite.damaged ? 'red' : satellite.color; // Change color if damaged
        ctx.fill();

        // Draw satellite name
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(satellite.name, x + 15, y + 5);
    });
}

// Function to draw geomagnetic storm effect
function drawStorm() {
    const auroraColors = ['rgba(0, 255, 0, 0.2)', 'rgba(0, 0, 255, 0.2)', 'rgba(255, 0, 255, 0.2)'];
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, earthRadius + 10 + i * 10, 0, Math.PI * 2);
        ctx.strokeStyle = auroraColors[i % auroraColors.length];
        ctx.lineWidth = 4 + i; // Vary the line width for a more dynamic look
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
