// Initialisation de la scène, de la caméra et du rendu
const canvas = document.getElementById('threejs-canvas-bg');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50; // Distance de la caméra par rapport aux particules

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Fond noir

// Création des particules
const particlesCount = 1000; // Nombre de particules
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
    color: 0x39ff14, // Couleur vert néon
    size: 0.2, // Taille des particules
    sizeAttenuation: true // Les particules rétrécissent avec la distance
});

const particlesPositions = new Float32Array(particlesCount * 3); // Chaque particule a 3 coordonnées (x, y, z)
for (let i = 0; i < particlesCount * 3; i++) {
    particlesPositions[i] = (Math.random() - 0.5) * 100; // Génère des positions aléatoires
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlesPositions, 3));
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Mouvement de la souris
const mouse = {
    x: 0,
    y: 0
};

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // Normaliser la position X de la souris
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; // Normaliser la position Y de la souris
});

// Animation des particules
function animateParticles() {
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.001;
    
    // Déplacer les particules selon la position de la souris
    particles.position.x = mouse.x * 5;
    particles.position.y = mouse.y * 5;
}

// Fonction d'animation
function animate() {
    requestAnimationFrame(animate);

    animateParticles(); // Appliquer le mouvement des particules

    renderer.render(scene, camera);
}

animate();

// Ajuster la taille du rendu lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
