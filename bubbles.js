// Initialisation de la scène, de la caméra et du rendu
const canvasBubbles = document.getElementById('threejs-canvas-bubbles');
const sceneBubbles = new THREE.Scene();
const cameraBubbles = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
cameraBubbles.position.z = 400; // Distance de la caméra par rapport aux bulles

const rendererBubbles = new THREE.WebGLRenderer({ canvas: canvasBubbles, antialias: true, alpha: true });
rendererBubbles.setSize(window.innerWidth, window.innerHeight);
rendererBubbles.setPixelRatio(window.devicePixelRatio);
rendererBubbles.setClearColor(0x000000, 0); // Fond transparent (alpha = 0)

// Lumières pour les bulles
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lumière ambiante douce
sceneBubbles.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 100, 100).normalize();
sceneBubbles.add(directionalLight);

// Liste des technologies à afficher
const technologies = [
    { name: 'HTML', size: 20 },
    { name: 'CSS', size: 15 },
    { name: 'JavaScript', size: 25 },
    { name: 'React', size: 20 },
    { name: 'Node.js', size: 15 },
    { name: 'Bulma', size: 10 },
    { name: 'Git', size: 15 },
    // Ajoute d'autres technologies ici
];

// Tableau pour stocker les bulles et leurs positions de départ
const bubbles = [];

// Fonction pour créer une bulle 3D avec texte
function createBubble(text, size) {
    // Géométrie de la bulle
    const sphereGeometry = new THREE.SphereGeometry(size, 40, 40);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x39ff14, // Couleur verte néon
        transparent: true,
        opacity: 0.3, // Opacité de la bulle
    });

    const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

    // Ajouter un texte 3D au centre de la bulle
    const loader = new THREE.FontLoader();
    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
        const textGeometry = new THREE.TextGeometry(text, {
            font: font,
            size: size / 1, // Taille du texte relative à la bulle
            height: 1,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff, // Couleur du texte blanc
        });

        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        textMesh.position.set(-textWidth / 2, 0, size / 2 + 1); // Centrer le texte dans la bulle
        sphereMesh.add(textMesh);
    });

    // Positionner la bulle de manière aléatoire dans l'espace
    sphereMesh.initialPosition = {
        x: (Math.random() - 0.5) * 400,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 400
    };

    sphereMesh.position.set(
        sphereMesh.initialPosition.x,
        sphereMesh.initialPosition.y,
        sphereMesh.initialPosition.z
    );

    bubbles.push(sphereMesh); // Ajouter la bulle au tableau
    sceneBubbles.add(sphereMesh);
}

// Créer et ajouter les bulles à la scène
technologies.forEach(tech => {
    createBubble(tech.name, tech.size);
});

// Fonction pour créer une ligne entre deux bulles
function createLine(bubble1, bubble2) {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x39ff14, opacity: 0.5, transparent: true });
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(bubble1.position.x, bubble1.position.y, bubble1.position.z),
        new THREE.Vector3(bubble2.position.x, bubble2.position.y, bubble2.position.z)
    ]);

    const line = new THREE.Line(lineGeometry, lineMaterial);
    sceneBubbles.add(line);
}

// Créer des lignes fixes entre les bulles
for (let i = 0; i < bubbles.length; i++) {
    for (let j = i + 1; j < bubbles.length; j++) {
        createLine(bubbles[i], bubbles[j]);
    }
}

// Animation de la scène
function animateBubbles() {
    requestAnimationFrame(animateBubbles);

    // Rotation lente de la scène
    sceneBubbles.rotation.y += 0.01;

    // Animation des bulles pour qu'elles bougent légèrement autour de leur position initiale
    bubbles.forEach((bubble, index) => {
        bubble.position.x = bubble.initialPosition.x + Math.sin(Date.now() * 0.001 + index) * 25;
        bubble.position.y = bubble.initialPosition.y + Math.cos(Date.now() * 0.001 + index) * 25;
    });

    rendererBubbles.render(sceneBubbles, cameraBubbles);
}

animateBubbles();

// Ajuster la taille du rendu lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    rendererBubbles.setSize(width, height);
    cameraBubbles.aspect = width / height;
    cameraBubbles.updateProjectionMatrix();
});
