const section = document.querySelector(".hero-cover")

const width = section.clientWidth
const height = section.clientHeight

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)
section.appendChild(renderer.domElement)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.55)
scene.add(ambientLight)

const light = new THREE.DirectionalLight(0xffffff, 0.55)
light.position.set(0, 0, 4)
scene.add(light)


const loader = new THREE.TextureLoader()

const urls = ["book/edge.png", "book/spine.jpeg", "book/top.png", "book/bottom.png", "book/front.jpg", "book/back.jpeg"];

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
})


const geometry = new THREE.BoxGeometry(3.33, 5, 0.5)

const cube = new THREE.Mesh(geometry, materials);

scene.add(cube);

camera.position.z = 4.7;

// Define a variable for camera movement speed
const cameraMoveSpeed = 0.2;

// Add event listener for keyboard input
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    // Move camera forward (along z-axis)
    case "w":
      camera.position.z -= cameraMoveSpeed;
      break;
    // Move camera backward (along z-axis)
    case "s":
      camera.position.z += cameraMoveSpeed;
      break;
    // Move camera left (along x-axis)
    case "a":
      camera.position.x -= cameraMoveSpeed;
      break;
    // Move camera right (along x-axis)
    case "d":
      camera.position.x += cameraMoveSpeed;
      break;
    // Move camera up (along y-axis)
    case "r":
      camera.position.y += cameraMoveSpeed;
      break;
    // Move camera down (along y-axis)
    case "f":
      camera.position.y -= cameraMoveSpeed;
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);

  const currentTimeline = window.pageYOffset / 300

  // const rx = currentTimeline * 0.5 - 0.5
  // const ry = -(currentTimeline * 0.9 + 0.1) * Math.PI * 2

  // const ry = -currentTimeline * -0.5 * Math.PI  // 0 → -π: front, through spine, to back
  // const rx = 0


  const baseRy = -0.7

  const rx = 0;
  const ry = baseRy + currentTimeline * (Math.PI * 0.7)  // much smaller swing

  // cube.rotation.set(rx, ry, 0)

  cube.rotation.set(rx, ry, 0)

  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
  const newWidth = section.clientWidth
  const newHeight = section.clientHeight

  camera.aspect = newWidth / newHeight
  camera.updateProjectionMatrix()
  renderer.setSize(newWidth, newHeight)
})