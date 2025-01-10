import Scroll from '@ts/components/Scroll';
import * as dat from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', async () => {
  const scroll = new Scroll();
  await webgl();
});

const webgl = async () => {
  /**
   * Base
   */
  // Debug
  const gui = new dat.GUI();

  // Canvas
  const canvas = document.querySelector('canvas.webgl');

  // Scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#000');

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // var gridHelper = new THREE.GridHelper(100, 20);
  // scene.add(gridHelper);
  // const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  /**
   * Test mesh
   */
  function z(x, y) {
    return 0;
    // return 70 * Math.exp(-(x * x + y * y) / 400);
  }
  // Geometry
  const points = [];
  const pointNum = 25;
  for (let i = 0; i < pointNum; i++) {
    for (let j = 0; j < pointNum; j++) {
      const x0 = (i - pointNum / 2) * 2;
      const y0 = (j - pointNum / 2) * 2;
      const z0 = 0;
      const x1 = (i + 1 - pointNum / 2) * 2;
      const y1 = (j - pointNum / 2) * 2;
      const z1 = 0;
      const p1 = new THREE.Vector3(x0, y0, z0);
      const p2 = new THREE.Vector3(x1, y1, z1);
      points.push(p1, p2);
    }
    for (let j = 0; j < pointNum; j++) {
      const x0 = (j - pointNum / 2) * 2;
      const y0 = (i - pointNum / 2) * 2;
      const z0 = 0;
      const x1 = (j - pointNum / 2) * 2;
      const y1 = (i - 1 - pointNum / 2) * 2;
      const z1 = 0;
      const p1 = new THREE.Vector3(x0, y0, z0);
      const p2 = new THREE.Vector3(x1, y1, z1);
      points.push(p1, p2);
    }
  }

  // console.log('points :>> ', points);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  // Material
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    // linewidth: 1.0,
    // linecap: 'butt',
    // linejoin: 'miter',
    // transparent: true,
    // opacity: 0.5,
  });

  // Mesh
  const perNum = 5;
  const gruop = new THREE.Group();
  for (let i = 0; i < perNum; i++) {
    let line = new THREE.LineSegments(geometry, material);
    line.rotation.y = (Math.PI / perNum) * i;
    line.material.color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random(),
    );
    console.log('i :>> ', i);
    gruop.add(line);
  }
  scene.add(gruop);

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(10, 50, 70);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  gui.add(camera.position, 'x').max(100).min(0).step(0.1);
  gui.add(camera.position, 'y').max(900).min(0).step(0.1);
  gui.add(camera.position, 'z').max(100).min(0).step(0.1);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /**
   * Animate
   */

  const tick = () => {
    // Update controls
    controls.update();

    gruop.children.forEach((el, index) => {
      el.rotation.y += 0.02 * index;
      el.material.color = new THREE.Color(
        Math.random(),
        Math.random(),
        Math.random(),
      );
    });

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};
