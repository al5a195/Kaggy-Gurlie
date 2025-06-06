console.clear();

/* SETUP */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  5000
);
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controlsWebGL = new THREE.OrbitControls(camera, renderer.domElement);

/* PARTICLES */
const tl = gsap.timeline({
  repeat: -1,
  yoyo: true
});

const path = document.querySelector("path");
const length = path.getTotalLength();
const vertices = [];

for (let i = 0; i < length; i += 0.1) {
  const point = path.getPointAtLength(i);
  const vector = new THREE.Vector3(point.x, -point.y, 0);
  vector.x += (Math.random() - 0.5) * 30;
  vector.y += (Math.random() - 0.5) * 30;
  vector.z += (Math.random() - 0.5) * 70;
  vertices.push(vector);
  
  tl.from(vector, {
    x: 600 / 2,
    y: -552 / 2,
    z: 0,
    ease: "power2.inOut",
    duration: "random(2, 5)"
  }, i * 0.002);
}

const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
const material = new THREE.PointsMaterial({ 
  color: 0xee5282, 
  blending: THREE.AdditiveBlending, 
  size: 3 
});
const particles = new THREE.Points(geometry, material);
particles.position.x -= 600 / 2;
particles.position.y += 552 / 2;
scene.add(particles);

gsap.fromTo(scene.rotation, {
  y: -0.2
}, {
  y: 0.2,
  repeat: -1,
  yoyo: true,
  ease: 'power2.inOut',
  duration: 3
});

/* AUDIO */
const bgMusic = document.getElementById('backgroundMusic');
bgMusic.volume = 0.3;

function createMusicButton() {
  const btn = document.createElement('div');
  btn.innerHTML = '▶ Play Music';
  btn.style.position = 'absolute';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.padding = '10px 15px';
  btn.style.background = '#ee5282';
  btn.style.color = 'white';
  btn.style.borderRadius = '5px';
  btn.style.cursor = 'pointer';
  btn.style.zIndex = '100';
  
  btn.addEventListener('click', () => {
    bgMusic.play();
    btn.innerHTML = 'Music Playing';
    setTimeout(() => btn.remove(), 2000);
  });
  
  document.body.appendChild(btn);
}

// Start audio on first interaction
document.body.addEventListener('click', function init() {
  bgMusic.play().catch(e => {
    console.log('Autoplay blocked, showing button');
    createMusicButton();
  });
  document.body.removeEventListener('click', init);
}, { once: true });

/* RENDERING */
function render() {
  requestAnimationFrame(render);
  geometry.setFromPoints(vertices);
  renderer.render(scene, camera);
  controlsWebGL.update();
}

/* EVENTS */
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onWindowResize, false);

render();
