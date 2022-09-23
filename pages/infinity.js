let scene, camera, renderer, stars, starGeo;

function init() {
  const heading = document.getElementById("heading");
  const button = document.getElementById("button");
  const element = document.getElementById("loading-screen");

  heading.style.opacity = 0;
  button.style.opacity = 0;

  setTimeout(() => {
    element.classList.add("fadingOut");
  }, 3000);

  setTimeout(() => {
    element.remove();
    heading.classList.add("fading");
    button.classList.add("fading");
  }, 5000);

  setTimeout(() => {
    heading.style.opacity = 1;
    button.style.opacity = 1;
  }, 12500);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  starGeo = new THREE.Geometry();

  let number = 0;

  let intervalStar = setInterval(() => {
    for (let i = 0; i < 2000; i++) {
      star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 0;
      star.acceleration = 0.0002;
      starGeo.vertices.push(star);
    }

    let sprite = new THREE.TextureLoader().load("assets/star.png");
    let starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
    });

    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);

    window.addEventListener("resize", onWindowResize, false);

    animate();
  }, 3000);

  setTimeout(function () {
    clearInterval(intervalStar);
  }, 21000);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.y -= p.velocity;

    if (p.y < -200) {
      p.y = 200;
      p.velocity = 0;
    }
  });
  starGeo.verticesNeedUpdate = true;
  stars.rotation.y += 0.002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
init();
